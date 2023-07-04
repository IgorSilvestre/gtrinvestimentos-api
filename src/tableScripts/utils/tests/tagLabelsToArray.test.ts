import { tagLabelsToArray } from '../tagLabelsToArray'

describe('tagLabelsToArray', () => {
  it('should convert tagLabels string to an array of strings', () => {
    const input = 'label1, label2, label3'
    const expectedOutput = ['label1', 'label2', 'label3']
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should handle empty tagLabels string', () => {
    const input = ''
    const expectedOutput: string[] = []
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should handle tagLabels with leading/trailing spaces', () => {
    const input = '   label1, label2, label3   '
    const expectedOutput = ['label1', 'label2', 'label3']
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should handle tagLabels with extra whitespace between labels', () => {
    const input = 'label1 , label2 , label3'
    const expectedOutput = ['label1', 'label2', 'label3']
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should handle tagLabels with parentheses', () => {
    const input = 'label1, (label2), label3'
    const expectedOutput = ['label1', 'label2', 'label3']
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should handle tagLabels with special characters', () => {
    const input = 'label1, $label2, label3@'
    const expectedOutput = ['label1', 'label2', 'label3']
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })

  it('should return an empty array when tagLabels is not a string', () => {
    const input = 123 // not a string
    const expectedOutput: string[] = []
    // @ts-ignore because where testing for wrong params type
    expect(tagLabelsToArray(input)).toEqual(expectedOutput)
  })
})
