/**
 * CLI output logic
 * @module src/output
 */
'use strict'

const Table = require('cli-table')
const clear = require('cli-clear')
const pluck = require('101/pluck')

class Output {
  constructor (expressions) {
    this._expressions = expressions
    this._expressions.createReadStream().on('data', () => {
      this.refresh()
    })
  }

  /**
   * Clear previous terminal output and output tabular information
   */
  refresh () {
    const table = new Table({
      head: ['ID', 'Operation', 'Result', 'Duration (ms)']
    })
    table.push(...this._expressions.toArray().map(pluck('getOutputRow()')))
    clear()
    console.log([
      'Generating expressions... (showing last 10)',
      table.toString()
    ].join('\n'))
  }
}

module.exports = Output
