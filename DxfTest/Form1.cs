using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using DxfLib;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfTest
{
    public partial class Form1 : Form
    {
        private readonly Bitmap bitmap;
        private bool dragging;
        private DxfFile dxfFile;
        private Point mouseStart;

        public Form1()
        {
            InitializeComponent();
            pictureBoxMain.MouseWheel += OnMouseWheel;
            bitmap = new Bitmap(pictureBoxMain.Width, pictureBoxMain.Height);

            Renderer = new Renderer(1f, 0, 0);
        }

        private float Arc { get; set; }

        private Renderer Renderer { get; }

        private void OnMouseWheel(object sender, MouseEventArgs e)
        {
            var delta = e.Delta / SystemInformation.MouseWheelScrollDelta;

            Renderer.ScaleFactor += 0.1f * delta;

            if (dxfFile != null)
            {
                Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);
                pictureBoxMain.Refresh();
            }
        }

        private Dictionary<string, int> CollectStats(IList<DxfEntity> dxgEntities)
        {
            var entitiesCount = new Dictionary<string, int>();
            foreach (var name in Enum.GetNames(typeof(DxfEntityType))) entitiesCount.Add(name.ToLower(), 0);

            foreach (var dxfEntity in dxgEntities) entitiesCount[dxfEntity.EntityTypeString.ToLower()]++;

            return entitiesCount;
        }

        private void buttonOpenDxf_Click(object sender, EventArgs e)
        {
            var opf = new OpenFileDialog();
            opf.Filter = "DXF Files(*.dxf)|*.dxf";
            if (opf.ShowDialog() == DialogResult.OK)
            {
                dxfFile = DxfFile.Load(opf.FileName);

                Renderer.Render(dxfFile, bitmap, pictureBoxMain.Width, pictureBoxMain.Height);

                var encodedFile = new DxfToJsonConverter().EncodeFileJson(dxfFile);
                File.WriteAllText("json.json", encodedFile);

                pictureBoxMain.Refresh();

                labelCost.Text = "Cost: " + new Mather().GetFileTotalLength(dxfFile) + " c.u.";
            }

            Focus();
        }

        private void pictureBoxMain_Paint(object sender, PaintEventArgs e)
        {
            if (bitmap != null) e.Graphics.DrawImageUnscaled(bitmap, 0, 0);

            e.Graphics.DrawArc(Pens.Red, pictureBoxMain.Width / 2f - 50, pictureBoxMain.Height / 2f - 50, 100, 100, 0,
                Arc);
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
                var dx = e.Location.X - mouseStart.X;
                var dy = e.Location.Y - mouseStart.Y;

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

        private void trackBarRotOffset_Scroll(object sender, EventArgs e)
        {
            // Arc = -(trackBarRotOffset.Value - 180);
            pictureBoxMain.Refresh();
        }
    }
}