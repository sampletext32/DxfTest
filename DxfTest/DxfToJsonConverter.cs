using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfTest
{
    public class DxfToJsonConverter
    {
        private DxfFile _dxfFile;

        public string EntitiesToJson(IList<DxfEntity> dxfEntities)
        {
            string json = string.Join(", ", dxfEntities.Select(EntityToJson));
            return json;
        }

        public string EntityToJson(DxfEntity dxfEntity)
        {
            if (dxfEntity is DxfPolyline dxfPolyline)
            {
                return EntityToJson(dxfPolyline);
            }
            else if (dxfEntity is DxfLine dxfLine)
            {
                return EntityToJson(dxfLine);
            }
            else if (dxfEntity is DxfSpline dxfSpline)
            {
                return EntityToJson(dxfSpline);
            }
            else if (dxfEntity is DxfCircle dxfCircle)
            {
                if (dxfCircle is DxfArc dxfArc)
                {
                    return EntityToJson(dxfArc);
                }
                else
                {
                    return EntityToJson(dxfCircle);
                }
            }
            else if (dxfEntity is DxfInsert dxfInsert)
            {
                return EntityToJson(dxfInsert);
            }

            throw new ArgumentException($"Unknown DxfEntity {dxfEntity}");

            return "{}";
        }

        public string EntityToJson(DxfPolyline dxfPolyline)
        {
            var dxfPolylineVertices = dxfPolyline.Vertices;

            string json = "";

            using (var enumerator = dxfPolylineVertices.GetEnumerator())
            {
                if (!enumerator.MoveNext()) return "{}";

                DxfVertex last = enumerator.Current;

                enumerator.MoveNext();
                while (true)
                {
                    var current = enumerator.Current;

                    json += string.Format("[ \"line\", {0}, {1}, {2}, {3}]",
                        last.Location.X.ToString("F").Replace(',', '.'),
                        last.Location.Y.ToString("F").Replace(',', '.'),
                        current.Location.X.ToString("F").Replace(',', '.'),
                        current.Location.Y.ToString("F").Replace(',', '.'));

                    last = current;
                    if (enumerator.MoveNext())
                    {
                        json += ", ";
                    }
                    else
                    {
                        break;
                    }
                }
            }

            return json;
        }

        public string EntityToJson(DxfLine dxfLine)
        {
            return string.Format("[ \"line\", {0}, {1}, {2}, {3}]",
                dxfLine.P1.X.ToString("F").Replace(',', '.'),
                dxfLine.P1.Y.ToString("F").Replace(',', '.'),
                dxfLine.P2.X.ToString("F").Replace(',', '.'),
                dxfLine.P2.Y.ToString("F").Replace(',', '.'));
        }

        public string EntityToJson(DxfSpline dxfSpline)
        {
            // TODO!
            var dxfSplineControlPoints = dxfSpline.ControlPoints;

            string json = string.Join(", ",
                dxfSplineControlPoints.Select(cp => string.Format("[ {0}, {1}]",
                    cp.Point.X.ToString("F").Replace(',', '.'),
                    cp.Point.Y.ToString("F").Replace(',', '.'))));

            return string.Format("[ \"spline\", {0}]", json);
        }

        public string EntityToJson(DxfArc dxfArc)
        {
            float startAngle = (float)dxfArc.StartAngle;
            float endAngle = (float)dxfArc.EndAngle;

            startAngle *= -1;
            endAngle *= -1;

            float sweep = (endAngle - startAngle - 360) % 360;

            return string.Format("[ \"arc\", {0}, {1}, {2}, {3}, {4}]",
                dxfArc.Center.X.ToString("F").Replace(',', '.'),
                dxfArc.Center.Y.ToString("F").Replace(',', '.'),
                dxfArc.Radius.ToString("F").Replace(',', '.'),
                dxfArc.StartAngle.ToString("F").Replace(',', '.'),
                sweep.ToString("F").Replace(',', '.'));
        }

        public string EntityToJson(DxfCircle dxfCircle)
        {
            // We dont care about center

            return string.Format("[ \"circle\", {0}, {1}, {2} ]",
                dxfCircle.Center.X.ToString("F").Replace(',', '.'),
                dxfCircle.Center.Y.ToString("F").Replace(',', '.'),
                dxfCircle.Radius.ToString("F").Replace(',', '.'));
        }

        public string EntityToJson(DxfInsert dxfInsert)
        {
            var dxfBlock = _dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            string json = EntitiesToJson(dxfBlock.Entities);
            return json;
        }

        public string EncodeFileJson(DxfFile dxfFile)
        {
            // var entitiesCount = CollectStats(dxfFile.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text = "\n\tFILE:\n" + typesString + "\n";

            this._dxfFile = dxfFile;

            string result = "[ " + EntitiesToJson(dxfFile.Entities) + "]";

            this._dxfFile = null;

            return result;
        }
    }
}