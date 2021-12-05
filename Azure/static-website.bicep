param environment string
param resourcePrefix string
param location string = resourceGroup().location
param repositoryBranch string
param repositoryUrl string
// the repository token to setup actions workflow and api secrets (https://github.com/settings/tokens)
// needs to have repo and workflow access
@secure()
param repositoryToken string
param skuName string = 'Free'
param skuTier string = 'Free'

// https://docs.microsoft.com/en-us/azure/templates/microsoft.web/staticsites?tabs=bicep
resource staticWebApp 'Microsoft.Web/staticSites@2021-01-15' = {
  name: 'ss-${resourcePrefix}-${environment}'
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    provider: 'GitHub' // required to ensure success in follow up deployments
    repositoryUrl: repositoryUrl
    repositoryToken: repositoryToken
    branch: repositoryBranch
    buildProperties: {
      outputLocation: 'out' // next.js will export to the out directory
      appLocation: '/'
      apiLocation: ''
    }
  }
}
// Outputs
output deployment_token string = listSecrets(staticWebApp.id, staticWebApp.apiVersion).properties.apiKey
