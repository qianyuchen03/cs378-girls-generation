// utils/tagUtils.js
export const getMostFrequentTags = (tagsArray) => {
    const tagCounts = {};
    
    tagsArray.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  };