import React from "react"
import {useEffect, useState} from 'react'
import * as Constants from './constants'

export default function App() {
   //build the board with a state variable that's an array to store the series of colors on my board. 
   //create css to display grid 8x8
   //create pattern of 3/4 checkers
   //create moveOneDown function to create the downward motion
   //implement drag and drop functionalities
    const colors = Constants.colors;
    const colorNum = colors.length;
    const width = Constants.width;
    const [candies, setCandies] = useState([]);
    const [candyBeingDragged, setCandyBeingDragged] = useState(null);
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);

    function getRand(n) {
        return Math.floor(Math.random()*n) //0-5
    }

    function createBoard() {
        const randomColors = new Array(width*width).fill('').map(()=>colors[getRand(colorNum)])
        setCandies(randomColors)
    }
    function dragStart(e) {
        console.log('dragstart', e.target.dataset.id);
        setCandyBeingDragged(parseInt(e.target.dataset.id))
    }
    function dragDrop(e) {
        console.log('drag drop',e.target.dataset.id)
        setCandyBeingReplaced(parseInt(e.target.dataset.id))
    }
    function dragEnd(e) {
        console.log('dragend',e.target.dataset.id)
        let temp = candies[candyBeingReplaced];
        candies[candyBeingReplaced] = candies[candyBeingDragged];
        candies[candyBeingDragged] = temp;
        console.log('candy being dragged', candyBeingDragged)
        const validMoves = [candyBeingDragged+1, candyBeingDragged-1, candyBeingDragged+width, candyBeingDragged-width];
        let isValidMove = validMoves.includes(candyBeingReplaced)//if where i'm going is in one of the four positions

        if(candyBeingDragged && isValidMove && (checkColumnOfFour()|| checkRowOfFour() || checkColumnOfThree() || checkRowOfThree())){
            console.log('do the move')
            setCandyBeingDragged(null);
            setCandyBeingReplaced(null);
            
        } else {
            let temp = candies[candyBeingReplaced];
            candies[candyBeingReplaced] = candies[candyBeingDragged];
            candies[candyBeingDragged] = temp;
        }
        setCandies([...candies])
    }

    function moveOneDown(){
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

        for (let i = 0 ; i<=55; i++){
            if(firstRow.includes(i) && candies[i]===''){
                candies[i]=colors[getRand(colorNum)]
            }
            if(candies[i+width]===''){
                candies[i+width] = candies[i];
                candies[i] = '';
            }
        }
    }

    function checkColumnOfFour(){
        let patternFound = false;
        for (let i =0; i<=39; i++){
            const isColumnOfFour = [i, i+width, i+ width * 2, i + width * 3];
            const decidedColor = candies[i]
            if(isColumnOfFour.every(index=>candies[index]===decidedColor)) {
                isColumnOfFour.forEach(index=>candies[index] = '')
                patternFound = true;
            }
        }
        return patternFound
    }
    function checkColumnOfThree(){
        let patternFound = false;
        for (let i =0; i<=47; i++){
            const isColumnOfThree = [i, i+width, i+ width * 2];
            const decidedColor = candies[i]
            if(isColumnOfThree.every(index=>candies[index]===decidedColor)) {
                console.log('col three found')
                isColumnOfThree.forEach(index=>candies[index] = '')
                patternFound = true;
            }
        }
        return patternFound;
    }
    function checkRowOfFour(){
        let patternFound=false;
        const doNotCheck=[5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
        for (let i =0; i<=60; i++){
            if (doNotCheck.includes(i)) continue
            const isRowOfFour = [i, i+1, i+2, i+3];
            const decidedColor = candies[i]
            if(isRowOfFour.every(index=>candies[index]===decidedColor)) {
                isRowOfFour.forEach(index=>candies[index] = '')
                patternFound = true;
            }
        }
        return patternFound
    }
    function checkRowOfThree(){
        let patternFound = false;
        const doNotCheck=[6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
        for (let i =0; i<=61; i++){
            if (doNotCheck.includes(i)) continue
            const isRowOfThree = [i, i+1, i+2];
            const decidedColor = candies[i]
            if(isRowOfThree.every(index=>candies[index]===decidedColor)) {
                isRowOfThree.forEach(index=>candies[index] = '');
                patternFound = true;
            }
        }
        return patternFound;
    }
    
    useEffect(()=>{
        createBoard();
    }, [])

    useEffect(()=>{
        const timer = setInterval(()=>{
            checkColumnOfFour();
            checkRowOfFour();
            checkColumnOfThree();
            checkRowOfThree();
            moveOneDown();
            setCandies([...candies]);
        }, 100)
        return ()=>clearInterval(timer)
    }, [checkColumnOfFour, checkColumnOfThree, checkRowOfFour, checkRowOfThree,  moveOneDown, candies])
    return (
        <div className="app">
            <div className="board">
                {candies.map((candy, index)=>
                (<div
                    key={index}
                    className={candy}
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragEnter={(e)=>e.preventDefault()}
                    onDragOver={(e)=>e.preventDefault()}
                    onDragLeave={(e)=>e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                >{index}
                </div>))}
            </div>
        </div>
        )
}