using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class LevelSelectionScreen : MenuScreen
{
    [Header("Grid Visualization")]
    [SerializeField] private RectTransform gridContainer;
    [SerializeField] private Image gridCellPrefab;
    [SerializeField, MinMaxRange(25f, 35f)] private RangedFloat cellSize = 35f;
    [SerializeField] private float cellSpacing = 2.5f;
    [SerializeField] private Color activeCellColor = new Color(0.3f, 0.7f, 0.3f);

    private void UpdateLevelInfo(SOMatch3Level selectedLevel)
    {
        ClearGrid();
        if (!selectedLevel) return;

        // Render the preview grid based on ScriptableObject data
        DrawGrid(selectedLevel.GridShape.Grid);
    }

    private void DrawGrid(Grid grid)
    {
        int width = grid.Width;
        int height = grid.Height;

        // Adaptive Sizing
        float actualCellSize = width <= 8 ? cellSize.maxValue : cellSize.minValue;

        // Calculate container size
        float totalWidth = (width * actualCellSize) + ((width - 1) * cellSpacing);
        float totalHeight = (height * actualCellSize) + ((height - 1) * cellSpacing);
        gridContainer.sizeDelta = new Vector2(totalWidth, totalHeight);

        // Instantiate cells
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                CreateCell(x, y, grid, actualCellSize);
            }
        }
    }

    private void CreateCell(int x, int y, Grid grid, float size)
    {
        Image cell = Instantiate(gridCellPrefab, gridContainer);
        RectTransform rect = cell.rectTransform;
        rect.sizeDelta = new Vector2(size, size);

        // Center the grid in the container
        float posX = (x * (size + cellSpacing)) - (gridContainer.sizeDelta.x / 2f) + (size / 2f);
        float posY = (y * (size + cellSpacing)) - (gridContainer.sizeDelta.y / 2f) + (size / 2f);
        rect.anchoredPosition = new Vector2(posX, posY);

        // Visual state based on data
        bool isActive = grid.IsCellActive(x, y);
        cell.color = isActive ? activeCellColor : Color.gray;
    }
}