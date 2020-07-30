using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfTest
{
    public class Renderer
    {
        private DxfFile _dxfFile;
        public float ScaleFactor { get; set; }
        public float OffsetX { get; set; }
        public float OffsetY { get; set; }

        public Renderer(float scaleFactor, float offsetX, float offsetY)
        {
            this.ScaleFactor = scaleFactor;
            this.OffsetX = offsetX;
            this.OffsetY = offsetY;
        }

        public void RenderEntities(IList<DxfEntity> dxfEntities, Graphics graphics, int height)
        {
            foreach (var dxfEntity in dxfEntities)
            {
                RenderEntity(dxfEntity, graphics, height);
            }
        }

        public void RenderEntity(DxfEntity dxfEntity, Graphics graphics, int height)
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

        public void RenderEntity(DxfPolyline dxfPolyline, Graphics graphics, int height)
        {
            var dxfPolylineVertices = dxfPolyline.Vertices;
            var points = dxfPolylineVertices
                .Select(t => new PointF((int)t.Location.X * ScaleFactor + OffsetX,
                    height - (int)t.Location.Y * ScaleFactor + OffsetY))
                .ToArray();
            graphics.DrawLines(Pens.Black, points);
        }

        public void RenderEntity(DxfLine dxfLine, Graphics graphics, int height)
        {
            graphics.DrawLine(Pens.Black,
                (float)dxfLine.P1.X * ScaleFactor + OffsetX,
                height - (float)dxfLine.P1.Y * ScaleFactor + OffsetY,
                (float)dxfLine.P2.X * ScaleFactor + OffsetX,
                height - (float)dxfLine.P2.Y * ScaleFactor + OffsetY);
        }

        public void RenderEntity(DxfSpline dxfSpline, Graphics graphics, int height)
        {
            var points = dxfSpline.ControlPoints
                .Select(t => new PointF((int)t.Point.X * ScaleFactor + OffsetX,
                    height - (int)t.Point.Y * ScaleFactor + OffsetY))
                .ToArray();

            graphics.DrawLines(Pens.Black, points);
        }

        public void RenderEntity(DxfArc dxfArc, Graphics graphics, int height)
        {
            float deltaAngle = (float)(dxfArc.EndAngle - dxfArc.StartAngle);
            graphics.DrawArc(Pens.Black,
                (float)(dxfArc.Center.X - dxfArc.Radius / 2) * ScaleFactor + OffsetX,
                height - (float)(dxfArc.Center.Y - dxfArc.Radius / 2) * ScaleFactor + OffsetY,
                (float)dxfArc.Radius * ScaleFactor,
                (float)dxfArc.Radius * ScaleFactor, (float)(dxfArc.StartAngle),
                deltaAngle);
        }

        public void RenderEntity(DxfCircle dxfCircle, Graphics graphics, int height)
        {
            graphics.DrawEllipse(Pens.Black,
                (float)(dxfCircle.Center.X - dxfCircle.Radius / 2) * ScaleFactor + OffsetX,
                height - (float)(dxfCircle.Center.Y - dxfCircle.Radius / 2) * ScaleFactor + OffsetY,
                (float)dxfCircle.Radius * ScaleFactor,
                (float)dxfCircle.Radius * ScaleFactor);
        }

        public void RenderEntity(DxfInsert dxfInsert, Graphics graphics, int height)
        {
            var dxfBlock = _dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            // var entitiesCount = CollectStats(dxfBlock.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text += $"\n\t{dxfBlock.Name}:\n" + typesString + "\n";

            foreach (var dxfEntity in dxfBlock.Entities)
            {
                RenderEntity(dxfEntity, graphics, height);
            }
        }

        public void Render(DxfFile dxfFile, Bitmap bitmap, int width, int height)
        {
            // var entitiesCount = CollectStats(dxfFile.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text = "\n\tFILE:\n" + typesString + "\n";

            this._dxfFile = dxfFile;

            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                // DXF Coordinates Y is upside-down
                // https://3e-club.ru/view_full.php?id=24&name=dxf
                graphics.Clear(Color.White);
                RenderEntities(dxfFile.Entities, graphics, height);
            }

            this._dxfFile = null;
        }
    }
}