import 'fake-indexeddb/auto'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

const captureRows = () => document.querySelectorAll('.capture-row')
const titleInput = () => screen.getByLabelText('Title') as HTMLInputElement
const rowFor = (text: string) => screen.getByText(text).closest('.capture-row') as HTMLElement

async function saveCapture(title: string) {
  fireEvent.change(titleInput(), { target: { value: title } })
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))
  await screen.findByText(title)
}

describe('capture editing', () => {
  it('cancels an edit, then creates a new capture instead of overwriting the edited one', async () => {
    localStorage.setItem('ap-lang', 'en')
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Capture' })[0])

    await saveCapture('First capture')
    expect(captureRows()).toHaveLength(1)

    fireEvent.click(within(rowFor('First capture')).getByRole('button', { name: 'Edit' }))
    expect(titleInput().value).toBe('First capture')
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(titleInput().value).toBe('')
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull()

    await saveCapture('Second capture')
    await waitFor(() => expect(captureRows()).toHaveLength(2))
    expect(screen.getByText('First capture')).toBeTruthy()

    fireEvent.click(within(rowFor('Second capture')).getByRole('button', { name: 'Edit' }))
    await saveCapture('Second capture, edited')
    await waitFor(() => expect(screen.queryByText('Second capture')).toBeNull())
    expect(captureRows()).toHaveLength(2)
  })
})
