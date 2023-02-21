import React from "react";
import "./SortingVisualizer.scss";
import { useState, useEffect } from "react";
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  iterateThroughAllBars,
  getQuickSortAnimations,
} from "../SortingAlgorithms/sortingAlgorithm";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  // Change this value for the speed of the animations.
  const ANIMATION_SPEED_MS = 10;
  const BUBBLE_SORT_SPEED_MS = 2;

  // This is the main color of the array bars.
  const PRIMARY_COLOR = "turquoise";

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = "red";

  const INITIAL_COLOR = "#7198EC";

  const VALIDATION_COLOR = "green";

  const generateRandomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const testSortingAlgorithms = () => {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = generateRandomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(generateRandomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getQuickSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    // console.log("Merge Sort:", animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayContainer__bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayContainer__bar");

      setTimeout(() => {
        const color = VALIDATION_COLOR;
        const arrayBars = document.getElementsByClassName(
          "arrayContainer__bar"
        );
        const [barOneIdx] = animations[i];
        arrayBars[barOneIdx].style.backgroundColor = color;
      }, i * BUBBLE_SORT_SPEED_MS);

      setTimeout(() => {
        const [barOneIdx, barOneHeight] = animations[i];
        const [barTwoIdx, barTwoHeight] = animations[i + 1];
        const currentHeightBarOne = Number(
          arrayBars[barOneIdx].style.height.slice(0, -2)
        );
        const currentHeightBarTwo = Number(
          arrayBars[barTwoIdx].style.height.slice(0, -2)
        );
        const color =
          currentHeightBarOne > currentHeightBarTwo
            ? VALIDATION_COLOR
            : INITIAL_COLOR;

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        const [firstIdx] = animations[0];
        arrayBars[firstIdx].style.backgroundColor = VALIDATION_COLOR;
      }, i * BUBBLE_SORT_SPEED_MS);
    }
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
    // console.log("Merge Sort:", animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayContainer__bar");
      const isColorChange = i % 3 === 0;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const resetArray = () => {
    const animations = iterateThroughAllBars(array);
    const newArray = [];

    for (let i = 0; i < 100; i++) {
      newArray.push(generateRandomIntFromInterval(5, 500));
    }
    setArray(newArray);

    for (let i = 0; i < animations.length; i++) {
      const color = INITIAL_COLOR;
      const arrayBars = document.getElementsByClassName("arrayContainer__bar");
      const [barOneIdx] = animations[i];
      arrayBars[barOneIdx].style.backgroundColor = color;
    }
  };

  return (
    <div>
      <h2 className="Title">Sorting Algorithm Visualizer</h2>
      <div className="arrayContainer">
        {array.map((value, idx) => (
          <div
            className="arrayContainer__bar"
            style={{ height: `${value}px` }}
            key={idx}
          ></div>
        ))}
      </div>
      <div className="sortingButtons">
        <button
          className="sortingButtons__button button"
          onClick={() => {
            resetArray();
          }}
        >
          Generate New Array
        </button>
        <button
          className="sortingButtons__button button"
          onClick={() => {
            mergeSort();
          }}
        >
          Merge Sort
        </button>
        <button
          className="sortingButtons__button button"
          onClick={() => {
            bubbleSort();
          }}
        >
          Bubble Sort
        </button>
        <button
          className="sortingButtons__button button"
          onClick={() => {
            quickSort();
          }}
        >
          Quick Sort
        </button>
        <button className="sortingButtons__button button">Heap Sort</button>
        {/* <button
          onClick={() => {
            testSortingAlgorithms();
          }}
          className="sortingButtons__button button"
        >
          Test Your Array
        </button> */}
      </div>
    </div>
  );
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
