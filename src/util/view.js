import { Dimensions } from 'react-native'

const basePx = 375

export const { width: deviceW, height: deviceH } = Dimensions.get('window')

export function px2dp (px) {
  return px * deviceW / basePx
}

// markdown 标签样式
export const markdownStyles = {
  heading1: {
    fontSize: 22
  },
  strong: {
    fontSize: 18
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 26
  },
  image: {
    width: deviceW - 20,
    height: 200
  }
}
