using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfLib
{
    public class DxfToJsonConverter
    {
        private DxfFile _dxfFile;

        public NumberFormatInfo Format { get; } = new NumberFormatInfo {NumberDecimalSeparator = "."};

        public string EntitiesToJson(IList<DxfEntity> dxfEntities)
        {
            var json = string.Join(", ", dxfEntities.Select(EntityToJson));
            return json;
        }

        public string EntityToJson(DxfEntity dxfEntity)
        {
            if (dxfEntity is DxfPolyline dxfPolyline) return EntityToJson(dxfPolyline);

            if (dxfEntity is DxfLine dxfLine) return EntityToJson(dxfLine);

            if (dxfEntity is DxfSpline dxfSpline) return EntityToJson(dxfSpline);

            if (dxfEntity is DxfCircle dxfCircle)
            {
                if (dxfCircle is DxfArc dxfArc)
                    return EntityToJson(dxfArc);
                return EntityToJson(dxfCircle);
            }

            if (dxfEntity is DxfLwPolyline dxfLwPolyline) return EntityToJson(dxfLwPolyline);

            if (dxfEntity is DxfInsert dxfInsert) return EntityToJson(dxfInsert);

            throw new ArgumentException($"Unknown DxfEntity {dxfEntity}");
        }

        public string EntityToJson(DxfPolyline dxfPolyline)
        {
            var dxfPolylineVertices = dxfPolyline.Vertices;

            var json = "";

            using (var enumerator = dxfPolylineVertices.GetEnumerator())
            {
                if (!enumerator.MoveNext()) return "{}";

                var last = enumerator.Current;

                enumerator.MoveNext();
                while (true)
                {
                    var current = enumerator.Current;

                    json += string.Format(Format, "[\"line\",{0:F},{1:F},{2:F},{3:F}]",
                        last.Location.X,
                        last.Location.Y,
                        current.Location.X,
                        current.Location.Y);

                    last = current;
                    if (enumerator.MoveNext())
                        json += ", ";
                    else
                        break;
                }
            }

            return json;
        }

        public string EntityToJson(DxfLwPolyline dxfLwPolyline)
        {
            // TODO!
            var dxfLwPolylineVertices = dxfLwPolyline.Vertices;

            var json = string.Join(", ",
                dxfLwPolylineVertices.Select(cp =>
                    string.Format(Format, "[{0:F},{1:F}]",
                        cp.X,
                        cp.Y)));

            return string.Format("[\"lwpolyline\",{0}]", json);
        }

        public string EntityToJson(DxfLine dxfLine)
        {
            return string.Format(Format, "[\"line\",{0:F},{1:F},{2:F},{3:F}]",
                dxfLine.P1.X,
                dxfLine.P1.Y,
                dxfLine.P2.X,
                dxfLine.P2.Y);
        }

        public string EntityToJson(DxfSpline dxfSpline)
        {
            // TODO!
            var dxfSplineControlPoints = dxfSpline.ControlPoints;

            var json = string.Join(", ",
                dxfSplineControlPoints.Select(cp =>
                    string.Format(Format, "[{0:F},{1:F}]",
                        cp.Point.X,
                        cp.Point.Y)));

            return string.Format("[\"spline\",{0}]", json);
        }

        public string EntityToJson(DxfArc dxfArc)
        {
            // float startAngle = (float)dxfArc.StartAngle;
            // float endAngle = (float)dxfArc.EndAngle;

            // startAngle *= -1;
            // endAngle *= -1;
            // 
            // float sweep = (endAngle - startAngle - 360) % 360;

            return string.Format(Format, "[\"arc\",{0:F},{1:F},{2:F},{3:F},{4:F}]",
                dxfArc.Center.X,
                dxfArc.Center.Y,
                dxfArc.Radius,
                dxfArc.StartAngle,
                dxfArc.EndAngle);
        }

        public string EntityToJson(DxfCircle dxfCircle)
        {
            // We dont care about center

            return string.Format(Format, "[\"circle\",{0:F},{1:F},{2:F}]",
                dxfCircle.Center.X,
                dxfCircle.Center.Y,
                dxfCircle.Radius);
        }

        public string EntityToJson(DxfInsert dxfInsert)
        {
            var dxfBlock = _dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            var json = EntitiesToJson(dxfBlock.Entities);
            return json;
        }

        public string EncodeFileJson(DxfFile dxfFile)
        {
            // var entitiesCount = CollectStats(dxfFile.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text = "\n\tFILE:\n" + typesString + "\n";

            _dxfFile = dxfFile;

            var result = string.Format(Format, "{{\"cost\":{0:F}, \"entities\":[{1}]}}",
                new Mather().GetFileTotalLength(dxfFile), EntitiesToJson(dxfFile.Entities));

            _dxfFile = null;

            return result;
        }
    }
}