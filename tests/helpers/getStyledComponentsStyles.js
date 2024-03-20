export const getStyledComponentStyles = (StyledComponent, index = 0) => {
  const componentClass = StyledComponent().type.styledComponentId
  const components = document.getElementsByClassName(componentClass)
  return window.getComputedStyle(components[index])
}