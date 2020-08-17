﻿using System;
using System.Collections.Generic;
using System.Linq;
using IxMilia.Dxf;
using IxMilia.Dxf.Entities;

namespace DxfLib
{
    public class Mather
    {
        private DxfFile _dxfFile;

        public float GetEntitiesTotalLength(IList<DxfEntity> dxfEntities)
        {
            var sum = dxfEntities.Sum(GetEntityLength);
            return sum;
        }

        public float GetEntityLength(DxfEntity dxfEntity)
        {
            if (dxfEntity is DxfPolyline dxfPolyline) return GetEntityLength(dxfPolyline);

            if (dxfEntity is DxfLine dxfLine) return GetEntityLength(dxfLine);

            if (dxfEntity is DxfSpline dxfSpline) return GetEntityLength(dxfSpline);

            if (dxfEntity is DxfCircle dxfCircle)
            {
                if (dxfCircle is DxfArc dxfArc)
                    return GetEntityLength(dxfArc);
                return GetEntityLength(dxfCircle);
            }

            if (dxfEntity is DxfInsert dxfInsert) return GetEntityLength(dxfInsert);

            throw new ArgumentException($"Unknown DxfEntity {dxfEntity}");

            return 0f;
        }

        private float Distance(DxfPoint p1, DxfPoint p2)
        {
            return (float)Math.Sqrt((p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y));
        }

        private float Distance(DxfVertex p1, DxfVertex p2)
        {
            return Distance(p1.Location, p2.Location);
        }

        public float GetEntityLength(DxfPolyline dxfPolyline)
        {
            var dxfPolylineVertices = dxfPolyline.Vertices;

            var sumDistance = 0f;

            using (var enumerator = dxfPolylineVertices.GetEnumerator())
            {
                if (!enumerator.MoveNext()) return sumDistance;

                var last = enumerator.Current;
                while (enumerator.MoveNext())
                {
                    var current = enumerator.Current;
                    sumDistance += Distance(current, last);
                    last = current;
                }
            }

            return sumDistance;
        }

        public float GetEntityLength(DxfLine dxfLine)
        {
            return Distance(dxfLine.P1, dxfLine.P2);
        }

        public float GetEntityLength(DxfSpline dxfSpline)
        {
            // TODO!
            var dxfSplineControlPoints = dxfSpline.ControlPoints;

            var sumDistance = 0f;

            using (var enumerator = dxfSplineControlPoints.GetEnumerator())
            {
                if (!enumerator.MoveNext()) return sumDistance;

                var last = enumerator.Current.Point;
                while (enumerator.MoveNext())
                {
                    var current = enumerator.Current.Point;
                    sumDistance += Distance(current, last);
                    last = current;
                }
            }

            return sumDistance;
        }

        public float GetEntityLength(DxfArc dxfArc)
        {
            var startAngle = (float)dxfArc.StartAngle;
            var endAngle = (float)dxfArc.EndAngle;

            startAngle *= -1;
            endAngle *= -1;

            var sweep = (endAngle - startAngle - 360) % 360;

            return (float)(2 * Math.PI * dxfArc.Radius * Math.Abs(sweep) / 360f);
        }

        public float GetEntityLength(DxfCircle dxfCircle)
        {
            // We dont care about center

            return (float)(2 * Math.PI * dxfCircle.Radius);
        }

        public float GetEntityLength(DxfInsert dxfInsert)
        {
            var dxfBlock = _dxfFile.Blocks.FirstOrDefault(t => t.Name == dxfInsert.Name);

            var sum = dxfBlock.Entities.Sum(GetEntityLength);
            return sum;
        }

        public float GetFileTotalLength(DxfFile dxfFile)
        {
            // var entitiesCount = CollectStats(dxfFile.Entities);
            // var typesString = string.Join("\n",
            //     entitiesCount.Keys.Where(k => entitiesCount[k] != 0).Select(k => k + ":" + entitiesCount[k]));
            // labelStats.Text = "\n\tFILE:\n" + typesString + "\n";

            _dxfFile = dxfFile;

            var result = GetEntitiesTotalLength(dxfFile.Entities);

            _dxfFile = null;

            return result;
        }
    }
}