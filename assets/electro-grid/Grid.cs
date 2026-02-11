using UnityEngine;
using System.Collections.Generic;

namespace DNExtensions.GridSystem
{
    [System.Serializable]
    public class Grid
    {
        public Vector2Int size;
        public Vector3 cellSize;
        public Vector3 cellSpacing;
        
        [HideInInspector] public bool[] cells;
        public GridOrientation orientation;
        
        public int Width => size.x;
        public int Height => size.y;

        private CoordinateConverter GetConverter()
        {
            return orientation == GridOrientation.Vertical 
                ? new VerticalConvertor() 
                : new HorizontalConvertor();
        }

        public bool IsCellActive(int x, int y)
        {
            if (x < 0 || x >= Width || y < 0 || y >= Height) return false;
            return cells[y * Width + x];
        }

        public Vector3 GetCellWorldPosition(int x, int y, Vector3 origin)
        {
            return GetConverter().GridToWorldCenter(
                new Vector2Int(x, y), size, cellSize, cellSpacing, origin
            );
        }

        public void Resize(int newWidth, int newHeight)
        {
            bool[] newCells = new bool[newWidth * newHeight];
            
            // ... Logic to copy existing cell data to new array ...

            size = new Vector2Int(newWidth, newHeight);
            cells = newCells;
        }
    }
}