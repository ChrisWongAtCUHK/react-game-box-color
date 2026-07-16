import { useState } from 'react'
import _ from 'underscore'
import './App.css'

const COLORS = ['red', 'yellow', 'blue', 'green']
const BLOCKCOUNT = 10
function App() {
  const [isOver, setIsOver] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [blockCount] = useState(BLOCKCOUNT)
  const [step, setStep] = useState(BLOCKCOUNT * 1.2)
  const [blockColors, setBlockColors] = useState(() => {
    let _blockColors = {}
    for (let w = 1; w <= BLOCKCOUNT * BLOCKCOUNT; w++) {
      _blockColors[w] = _.sample(COLORS)
    }
    return _blockColors
  })
  const [needCleanBlock, setNeedCleanBlock] = useState([])
  const [selectedColor, setSelectedColor] = useState('')

  const blockSize = () => {
    return (1 / blockCount) * 100 + '%'
  }

  const init = () => {
    setIsOver(false)
    setIsSuccess(false)
    setStep(blockCount * 1.2)
    let _blockColors = {}
    for (let w = 1; w <= blockCount * blockCount; w++) {
      _blockColors[w] = _.sample(COLORS)
    }
    setBlockColors(_blockColors)
  }

  const getSurroundBlock = (index, currentNeedCleanBlock) => {
    let color = blockColors[index]
    let surroundBlock = []
    if (
      index % blockCount !== 0 &&
      _.indexOf(currentNeedCleanBlock, index + 1) === -1 &&
      color === blockColors[index + 1]
    ) {
      surroundBlock.push(index + 1)
    }
    if (
      index % blockCount !== 1 &&
      _.indexOf(currentNeedCleanBlock, index - 1) === -1 &&
      color === blockColors[index - 1]
    ) {
      surroundBlock.push(index - 1)
    }
    if (
      _.indexOf(currentNeedCleanBlock, index + blockCount) === -1 &&
      color === blockColors[index + blockCount]
    ) {
      surroundBlock.push(index + blockCount)
    }
    if (
      _.indexOf(currentNeedCleanBlock, index - blockCount) === -1 &&
      color === blockColors[index - blockCount]
    ) {
      surroundBlock.push(index - blockCount)
    }
    return surroundBlock
  }

  const getNeedCleanBlock = () => {
    const index = 1
    let currentNeedCleanBlock = [index]
    let blockStark = [index]
    do {
      let surroundBlocks = getSurroundBlock(
        blockStark.pop(),
        currentNeedCleanBlock,
      )
      for (let blockIndex of surroundBlocks) {
        if (_.indexOf(currentNeedCleanBlock, blockIndex) === -1) {
          currentNeedCleanBlock.push(blockIndex)
          blockStark.push(blockIndex)
        }
      }
    } while (blockStark.length > 0)
    setNeedCleanBlock(currentNeedCleanBlock)
    return currentNeedCleanBlock
  }

  const checkGameStatus = (currentBlockColors) => {
    let colors = _.groupBy(currentBlockColors)
    if (_.size(colors) === 1) {
      setIsSuccess(true)
      return
    }
    if (step <= 0) {
      setIsOver(true)
    }
  }

  const changeSelectColor = (currentSelectedColor, currentNeedCleanBlock) => {
    var currentBlockColors = { ...blockColors }
    for (const key of currentNeedCleanBlock) {
      currentBlockColors[key] = currentSelectedColor
    }
    setBlockColors(currentBlockColors)

    checkGameStatus(currentBlockColors)
  }

  const clearBlock = (color) => {
    if (color === blockColors[1]) {
      return
    }
    setStep((prev) => prev - 1)
    setSelectedColor(color)
    const currentNeedCleanBlock = getNeedCleanBlock()
    changeSelectColor(color, currentNeedCleanBlock)
  }

  return (
    <div className="color-container">
      <div className="game-panel">
        {Array.from({ length: blockCount * blockCount }, (_, i) => i + 1).map(
          (index, col) => {
            return (
              <div
                key={col}
                style={{ width: blockSize(), height: blockSize() }}
              >
                <div className={`col-item ${blockColors[index]}`}></div>
              </div>
            )
          },
        )}
      </div>
      <div className="color-btn-wrap">
        {COLORS.map((color) => {
          return (
            <div
              key={color}
              className={`color-btn ${color}`}
              onClick={() => clearBlock(color)}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default App
