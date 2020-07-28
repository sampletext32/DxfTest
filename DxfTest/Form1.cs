using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfTest
{
    public partial class Form1 : Form
    {
        private DxfFile dxfFile;
        private Bitmap bitmap;
        private Point mouseStart;
        private bool dragging;
        private int offsetX = 0;
        private int offsetY = 0;

        private float scaleFactor = 1f;

        public Form1()
        {
            InitializeComponent();
            pictureBoxMain.MouseWheel += OnMouseWheel;
        }

        private void OnMouseWheel(object sender, MouseEventArgs e)
        {
            int delta = e.Delta / SystemInformation.MouseWheelScrollDelta;

            scaleFactor += 0.1f * delta;

            if (dxfFile != null)
            {
                Render(dxfFile);
                pictureBoxMain.Refresh();
            }
        }

        private Dictionary<string, int> CollectStats(IList<DxfEntity> dxgEntities)
        {
            Dictionary<string, int> entitiesCount = new Dictionary<string, int>();
            foreach (var name in Enum.GetNames(typeof(DxfEntityType)))
            {
                entitiesCount.Add(name.ToLower(), 0);
            }

            foreach (var dxfEntity in dxgEntities)
            {
                entitiesCount[dxfEntity.EntityTypeString.ToLower()]++;
            }

            return entitiesCount;
        }

        private void RenderEntities(IList<DxfEntity> dxfEntities, Graphics graphics, int height)
        {
            foreach (var dxfEntity in dxfEntities)
            {
                RenderEntity(dxfEntity, graphics, height);
            }
        }

        private void RenderEntity(DxfEntity dxfEntity, Graphics graphics, int height)
        {
            if (dxfEntity is DxfPolyline dxfPolyline)
            {
                RenderEntity(dxfPolyline, graphics, height);
            }
            else if (dxfEntity is DxfLine dxfLine)
            {
                RenderEntity(dxfLine, graphics, height);
            }
            else if (dxfEntity is DxfSpline dxfSpline)
            {
                RenderEntity(dxfSpline, graphics, height);
            }
            else if (dxfEntity is DxfCircle dxfCircle)
            {
                if (dxfCircle is DxfArc dxfArc)
                {
                    RenderEntity(dxfArc, graphics, height);
                }
                else
                {
                    RenderEntity(dxfCircle, graphics, height);
                }
            }
            else if (dxfEntity is DxfInsert dxfInsert)
            {
                RenderEntity(dxfInsert, graphics, height);
            }
        }

        private void RenderEntity(DxfPolyline dxfPolyline, Graphics graphics, int height)
        {
            var dxfPolylineVertices = dxfPolyline.Vertices;
            var points = dxfPolylineVertices
                .Select(t => new PointF((int)t.Location.X * scaleFactor + offsetX,
                    height - ((int)t.Location.Y * scaleFactor + offsetY)))
                .ToArray();
            graphics.DrawLines(Pens.Black, points);
        }

        private void RenderEntity(DxfLine dxfLine, Graphics graphics, int height)
        {
            graphics.DrawLine(Pens.Black,
                (float)dxfLine.P1.X * scaleFactor + offsetX,
                height - ((float)dxfLine.P1.Y * scaleFactor + offsetY),
                (float)dxfLine.P2.X * scaleFactor + offsetX,
                height - ((float)dxfLine.P2.Y * scaleFactor + offsetY));
        }

        private void RenderEntity(DxfSpline dxfSpline, Graphics graphics, int height)
        {
            var points = dxfSpline.ControlPoints
                .Select(t => new PointF((int)t.Point.X * scaleFactor + offsetX,
                    height - ((int)t.Point.Y * scaleFactor + offsetY)))
                .ToArray();

            graphics.DrawLines(Pens.Black, points);
        }

        private void RenderEntity(DxfArc dxfArc, Graphics graphics, int height)
        {
            graphics.DrawArc(Pens.Black,
                (float)(dxfArc.Center.X - dxfArc.Radius / 2) * scaleFactor + offsetX,
                height - ((float)(dxfArc.Center.Y - dxfArc.Radius / 2) * scaleFactor + offsetY),
                (float)dxfArc.Radius * scaleFactor,
                (float)dxfArc.Radius * scaleFactor, (float)dxfArc.StartAngle,
                (float)(dxfArc.EndAngle - dxfArc.StartAngle));
        }

        private void RenderEntity(DxfCircle dxfCircle, Graphics graphics, int height)
        {
            graphics.DrawEllipse(Pens.Black,
                (float)(dxfCircle.Center.X - dxfCircle.Radius / 2) * scaleFactor + offsetX,
                height - ((float)(dxfCircle.Center.Y - dxfCircle.Radius / 2) * scaleFactor + offsetY),
                (float)dxfCircle.Radius * scaleFactor,
                (float)dxfCircle.Radius * scaleFactor);
        }

        private void RenderEntity(DxfInsert dxfInsert, Graphics graphics, int height)
        {
            var dxfBlock = dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            var entitiesCount = CollectStats(dxfBlock.Entities);
            var typesString = string.Join("\n",
                entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            labelStats.Text += $"\n\t{dxfBlock.Name}:\n" + typesString + "\n";
            foreach (var dxfEntity in dxfBlock.Entities)
            {
                RenderEntity(dxfEntity, graphics, height);
            }
        }

        private void Render(DxfFile dxfFile)
        {
            int width = pictureBoxMain.Width;
            int height = pictureBoxMain.Height;
            bitmap = new Bitmap(width, height);

            labelStats.Text = "";
            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                // DXF Coordinates Y is upside-down
                // https://3e-club.ru/view_full.php?id=24&name=dxf
                RenderEntities(dxfFile.Entities, graphics, height);
            }
        }

        private void buttonOpenDxf_Click(object sender, EventArgs e)
        {
            OpenFileDialog opf = new OpenFileDialog();
            opf.Filter = "DXF Files(*.dxf)|*.dxf";
            if (opf.ShowDialog() == DialogResult.OK)
            {
                dxfFile = DxfFile.Load(opf.FileName);

                Render(dxfFile);
                pictureBoxMain.Refresh();
            }

            this.Focus();
        }

        private void pictureBoxMain_Paint(object sender, PaintEventArgs e)
        {
            if (bitmap != null)
            {
                e.Graphics.DrawImageUnscaled(bitmap, 0, 0);
            }
        }

        private void pictureBoxMain_MouseDown(object sender, MouseEventArgs e)
        {
            mouseStart = e.Location;
            dragging = true;
        }

        private void pictureBoxMain_MouseMove(object sender, MouseEventArgs e)
        {
            if (dragging)
            {
                int dx = e.Location.X - mouseStart.X;
                int dy = e.Location.Y - mouseStart.Y;

                mouseStart = e.Location;

                offsetX += dx;
                offsetY -= dy;

                if (dxfFile != null)
                {
                    Render(dxfFile);
                    pictureBoxMain.Refresh();
                }
            }
        }

        private void pictureBoxMain_MouseUp(object sender, MouseEventArgs e)
        {
            dragging = false;
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
        }

        private void pictureBoxMain_PreviewKeyDown(object sender, PreviewKeyDownEventArgs e)
        {
            if (e.KeyCode == Keys.F)
            {
                offsetX = 0;
                offsetY = 0;

                if (dxfFile != null)
                {
                    Render(dxfFile);
                    pictureBoxMain.Refresh();
                }
            }
        }
    }
}