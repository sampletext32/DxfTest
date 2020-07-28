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

        private Renderer Renderer { get; set; }

        public Form1()
        {
            InitializeComponent();
            pictureBoxMain.MouseWheel += OnMouseWheel;
            bitmap = new Bitmap(pictureBoxMain.Width, pictureBoxMain.Height);

            Renderer = new Renderer(1f, 0, 0);
        }

        private void OnMouseWheel(object sender, MouseEventArgs e)
        {
            int delta = e.Delta / SystemInformation.MouseWheelScrollDelta;

            Renderer.ScaleFactor += 0.1f * delta;

            if (dxfFile != null)
            {
                Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);
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

        private void buttonOpenDxf_Click(object sender, EventArgs e)
        {
            OpenFileDialog opf = new OpenFileDialog();
            opf.Filter = "DXF Files(*.dxf)|*.dxf";
            if (opf.ShowDialog() == DialogResult.OK)
            {
                dxfFile = DxfFile.Load(opf.FileName);

                Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);
                pictureBoxMain.Refresh();

                labelCost.Text = "Cost: " + new Mather().GetFileTotalLength(dxfFile) + " c.u.";
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

                Renderer.OffsetX += dx;
                Renderer.OffsetY += dy;

                if (dxfFile != null)
                {
                    Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);
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
                Renderer.OffsetX = 0;
                Renderer.OffsetY = 0;

                if (dxfFile != null)
                {
                    Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);
                    pictureBoxMain.Refresh();
                }
            }
        }
    }
}