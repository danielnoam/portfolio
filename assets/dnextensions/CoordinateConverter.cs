using UnityEngine;

namespace DNExtensions.GridSystem
{
    public abstract class CoordinateConverter
    {
        public abstract Vector3 GridToWorld(Vector2Int cellPos, Vector2Int gridSize, Vector3 cellSize, Vector3 spacing, Vector3 origin);
        public abstract Vector2Int WorldToGrid(Vector3 worldPos, Vector2Int gridSize, Vector3 cellSize, Vector3 spacing, Vector3 origin);
    }

    public class VerticalConvertor : CoordinateConverter
    {
        public override Vector3 GridToWorld(Vector2Int cellPos, Vector2Int gridSize, Vector3 cellSize, Vector3 spacing, Vector3 origin)
        {
            float posX = cellPos.x * (cellSize.x + spacing.x);
            float posY = cellPos.y * (cellSize.y + spacing.y);
            
            // ... Centering offset calculations ...
            
            return new Vector3(origin.x + posX, origin.y + posY, origin.z);
        }

        public override Vector2Int WorldToGrid(Vector3 worldPos, Vector2Int gridSize, Vector3 cellSize, Vector3 spacing, Vector3 origin)
        {
            worldPos -= origin;
            // ... Remove centering offsets ...
            
            int x = Mathf.FloorToInt(worldPos.x / (cellSize.x + spacing.x));
            int y = Mathf.FloorToInt(worldPos.y / (cellSize.y + spacing.y));
            
            return new Vector2Int(x, y);
        }
    }

    public class HorizontalConvertor : CoordinateConverter
    {
        public override Vector3 GridToWorld(Vector2Int cellPos, Vector2Int gridSize, Vector3 cellSize, Vector3 spacing, Vector3 origin)
        {
            // Maps Grid Y to World Z
            float posX = cellPos.x * (cellSize.x + spacing.x);
            float posZ = cellPos.y * (cellSize.z + spacing.z);
            
            return new Vector3(origin.x + posX, origin.y, origin.z + posZ);
        }

        // ... WorldToGrid Implementation ...
    }
}