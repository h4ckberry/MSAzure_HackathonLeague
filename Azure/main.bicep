param environment string = 'stg'
param location string = 'eastasia'
param resourcePrefix string = 'azhackathon-league'
// Parameters for static website
param repositoryUrl string = 'https://github.com/koooota/MSAzure_HackathonLeague/'
param repositoryBranch string = 'front_End'
// This file operates at a subscription level
targetScope = 'subscription'

param subscriptionId string
param kvResourceGroup string
param kvName string

// Key Vault
resource kv 'Microsoft.KeyVault/vaults@2019-09-01' existing = {
  name: kvName
  scope: resourceGroup(subscriptionId, kvResourceGroup)
}

resource MainRG 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  // name: 'rg-${resourcePrefix}-${environment}'
  name: 'rg-${resourcePrefix}'
  location: location
}

module ModuleStaticWebsite 'static-website.bicep' = {
  // Change deployment context to RG
  name: 'static-website'
  scope: resourceGroup(MainRG.name)
  params: {
    environment: environment
    resourcePrefix: resourcePrefix
    repositoryUrl: repositoryUrl
    repositoryBranch: repositoryBranch
    // repositoryToken: repositoryToken
    repositoryToken: kv.getSecret('GithubPAT')
  }
}
