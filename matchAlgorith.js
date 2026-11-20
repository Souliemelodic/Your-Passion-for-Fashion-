// matchAlgorithm.js
// This function calculates how well a closet item matches an inspo image based on color and category.

export function calculateMatchScore(closetItem, inspoItem) {
  let score = 0;
  
  // 1. Check Category Match (Max 50 points)
  if (closetItem.category === inspoItem.category) {
    score += 50;
  } else {
    // Partial credit if they are in similar families (e.g., Jacket matches Top)
    const relatedCategories = {
      "Top": ["Outerwear", "Dress"],
      "Bottoms": ["Dress"],
      "Shoes": ["Accessory"]
    };
    
    if (relatedCategories[closetItem.category]?.includes(inspoItem.category)) {
      score += 25;
    }
  }

  // 2. Check Color Match (Max 50 points)
  // For this MVP, we are doing exact hex code matches or basic color names
  if (closetItem.color.toLowerCase() === inspoItem.color.toLowerCase()) {
    score += 50;
  } else {
    // If it's the same color family (e.g., Navy and Blue), give partial points
    if (isSameColorFamily(closetItem.color, inspoItem.color)) {
      score += 30;
    }
  }

  // Ensure score doesn't exceed 100
  return Math.min(score, 100);
}

function isSameColorFamily(color1, color2) {
  const colorFamilies = [
    ["red", "maroon", "crimson", "burgundy"],
    ["blue", "navy", "teal", "cyan"],
    ["green", "olive", "emerald"],
    ["black", "charcoal", "grey", "gray"]
  ];
  
  for (let family of colorFamilies) {
    if (family.includes(color1.toLowerCase()) && family.includes(color2.toLowerCase())) {
      return true;
    }
  }
  return false;
}