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
    </div>
  )
}

export default App
