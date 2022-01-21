// TODO: Find out why this file has to have .cjs and remove the pluginFiles configuration.

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const faunadb = require('faunadb')

  const q = faunadb.query
  const client = new faunadb.Client({
    secret: 'secret',
    domain: 'localhost',
    port: 8443,
    scheme: 'http',
  })

  on('task', {
    async updatePissup (data) {
      const allDocuments = await client.query(
        q.Max(q.Paginate(q.Documents(q.Collection('pissup'))))
      )
      const pissupUnderTestId = allDocuments.data[0].id

      const response = await client.query(
        q.Update(
          q.Ref(q.Collection('pissup'), pissupUnderTestId),
          {
            data,
          }
        )
      )
      return response
    }
  })
}
