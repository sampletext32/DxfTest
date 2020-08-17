using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfTest
{
    public class Renderer
    {
        private DxfFile _dxfFile;

        public Renderer(float scaleFactor, float offsetX, float offsetY)
        {
            ScaleFactor = scaleFactor;
            OffsetX = offsetX;
            OffsetY = offsetY;
        }

        public float ScaleFactor { get; set; }
        public float OffsetX { get; set; }
        public float OffsetY { get; set; }

        public void RenderEntities(IList<DxfEntity> dxfEntities, Graphics graphics, int height)
        {
            foreach (var dxfEntity in dxfEntities) RenderEntity(dxfEntity, graphics, height);
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
                    RenderEntity(dxfArc, graphics, height);
                else
                    RenderEntity(dxfCircle, graphics, height);
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
                .Select(t => new PointF((float)t.Location.X * ScaleFactor + OffsetX,
                    height - (float)t.Location.Y * ScaleFactor + OffsetY))
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
                .Select(t => new PointF((float)t.Point.X * ScaleFactor + OffsetX,
                    height - (float)t.Point.Y * ScaleFactor + OffsetY))
                .ToArray();

            graphics.DrawLines(Pens.Black, points);
        }

        public void RenderEntity(DxfArc dxfArc, Graphics graphics, int height)
        {
            var startAngle = (float)dxfArc.StartAngle;
            var endAngle = (float)dxfArc.EndAngle;

            startAngle *= -1;
            endAngle *= -1;

            var sweep = (endAngle - startAngle - 360) % 360;

            graphics.DrawArc(Pens.Black,
                (float)(dxfArc.Center.X - dxfArc.Radius) * ScaleFactor + OffsetX,
                height - (float)(dxfArc.Center.Y + dxfArc.Radius) * ScaleFactor + OffsetY,
                (float)dxfArc.Radius * 2f * ScaleFactor,
                (float)dxfArc.Radius * 2f * ScaleFactor,
                startAngle,
                sweep);
        }

        public void RenderEntity(DxfCircle dxfCircle, Graphics graphics, int height)
        {
            graphics.DrawEllipse(Pens.Black,
                (float)(dxfCircle.Center.X - dxfCircle.Radius) * ScaleFactor + OffsetX,
                height - (float)(dxfCircle.Center.Y + dxfCircle.Radius) * ScaleFactor + OffsetY,
                (float)dxfCircle.Radius * 2f * ScaleFactor,
                (float)dxfCircle.Radius * 2f * ScaleFactor);
        }

        public void RenderEntity(DxfInsert dxfInsert, Graphics graphics, int height)
        {
            var dxfBlock = _dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            // var entitiesCount = CollectStats(dxfBlock.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text += $"\n\t{dxfBlock.Name}:\n" + typesString + "\n";

            foreach (var dxfEntity in dxfBlock.Entities) RenderEntity(dxfEntity, graphics, height);
        }

        public void Render(DxfFile dxfFile, Bitmap bitmap, int width, int height)
        {
            // var entitiesCount = CollectStats(dxfFile.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text = "\n\tFILE:\n" + typesString + "\n";

            _dxfFile = dxfFile;

            using (var graphics = Graphics.FromImage(bitmap))
            {
                // DXF Coordinates Y is upside-down
                // https://3e-club.ru/view_full.php?id=24&name=dxf
                graphics.Clear(Color.White);
                RenderEntities(dxfFile.Entities, graphics, height);
            }

            _dxfFile = null;
        }
    }
}