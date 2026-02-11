using UnityEngine;
using UnityEditor;

#if UNITY_EDITOR
namespace DNExtensions.GridSystem
{
    [CustomPropertyDrawer(typeof(Grid))]
    public class GridDrawer : PropertyDrawer
    {
        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            EditorGUI.BeginProperty(position, label, property);
            
            SerializedProperty cellsProp = property.FindPropertyRelative("cells");
            Vector2Int size = property.FindPropertyRelative("size").vector2IntValue;

            // ... Draw Standard Properties (Size, Spacing, Origin) ...

            Rect gridRect = CalculateGridRect(position, size);
            HandleInput(gridRect, size, cellsProp);
            DrawVisuals(gridRect, size, cellsProp);

            EditorGUI.EndProperty();
        }

        private void HandleInput(Rect gridRect, Vector2Int size, SerializedProperty cellsProp)
        {
            Event e = Event.current;
            
            if ((e.type == EventType.MouseDown || e.type == EventType.MouseDrag) && gridRect.Contains(e.mousePosition))
            {
                int x = Mathf.FloorToInt((e.mousePosition.x - gridRect.x) / CellSize);
                int visualY = Mathf.FloorToInt((e.mousePosition.y - gridRect.y) / CellSize);
                
                // Flip Y: Editor coords are Top-Down, Grid is Bottom-Up
                int y = size.y - 1 - visualY; 

                if (x >= 0 && x < size.x && y >= 0 && y < size.y)
                {
                    int index = y * size.x + x;
                    
                    // Toggle state and apply
                    bool currentState = cellsProp.GetArrayElementAtIndex(index).boolValue;
                    cellsProp.GetArrayElementAtIndex(index).boolValue = !currentState;
                    
                    cellsProp.serializedObject.ApplyModifiedProperties();
                    e.Use(); // Consume event
                }
            }
        }
        
        private void DrawVisuals(Rect gridRect, Vector2Int size, SerializedProperty cellsProp)
        {
             // ... Draw colored rectangles for active/inactive cells ...
        }
    }
}
#endif