export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1]); //green selected 2
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]); //red because it needs to swap
        animations.push([j + 1, array[j]]); // turquoise to show swapping
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animations.push([j, array[j]]); //turquoise bc 1st bar is currently in correct positoin
        animations.push([j + 1, array[j + 1]]); // turquoise bc 2nd bar is currently in correct positoin
      }
    }
  }

  return animations;
}

export function getQuickSortAnimations(array) {
    const animations = [];
    
    // call quicksort on the input array
    quickSortHelper(array, 0, array.length - 1, animations);
    
    return animations;
  }
  
  function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) {
      return;
    }
    
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivotIdx = endIdx;
    let i = startIdx;
    let j = endIdx - 1;
    
    while (i <= j) {
      animations.push([i, j, pivotIdx]); // color the elements being compared
      if (array[i] > array[pivotIdx] && array[j] < array[pivotIdx]) {
        animations.push([i, array[j]]);
        animations.push([j, array[i]]);
        swap(array, i, j);
      } else {
        if (array[i] <= array[pivotIdx]) {
          animations.push([i, i]); // color the element as sorted
          i++;
        }
        if (array[j] >= array[pivotIdx]) {
          animations.push([j, j]); // color the element as sorted
          j--;
        }
      }
    }
    
    animations.push([i, pivotIdx]); // swap pivot with the correct position
    swap(array, i, pivotIdx);
    
    return i;
  }
  
  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  

export function iterateThroughAllBars(array) {
  const animations = [];

  for (let i = 0; i < array.length; i++) {
    animations.push([i, i + 1]);
  }
  return animations;
}
