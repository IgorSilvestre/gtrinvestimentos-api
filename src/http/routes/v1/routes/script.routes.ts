import { Router } from 'express'
import { assetModel } from '../../../../modules/asset/infra/mongo/assetSchema';
import { IAssetDocument } from '../../../../modules/asset/interfaces-validation/IAssetDocument';
import { tagModel } from '../../../../modules/tag/infra/mongo/tagSchema';
import { companyModel } from '../../../../modules/company/infra/mongo/companySchema';
import { ZAsset } from '../../../../modules/asset/interfaces-validation/ZAsset';
import axios from 'axios';
import { excelDateToJSDate } from '../../../../shared/functions/excelDateToJSDate';
import { uploadFileMiddleware } from '../../../../middleware/middleware.uploadFile';
import { parseSheetToArrayOfObjects } from '../../../../shared/functions/parseSheetToArrayOfObjects';
import { AssetService } from '../../../../modules/asset/service/AssetService';

export const scriptRouter = Router()

scriptRouter.post('/fill-assets-from-sheet', uploadFileMiddleware, async (req, res) => {
  // const filePath = path.resolve(__dirname, '../../../../temp_resources/Produtos GTR_Ago24.xlsx')
  // const stores: ZAsset[] = parseSheetToArrayOfObjects(filePath, 'Ativo_Renda')
  const stores: ZAsset[] = parseSheetToArrayOfObjects(req.file.buffer, 'Ativo_Renda')
  for (const store of stores) {
    store.name = store.tenant + ' - ' + store.city
    store.name.trim()

    if (store.name.match(/log/gi) || store.name.match(/transportadora/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc86f"]
    else if (store.name.match(/panvel/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc870", "64d39a6cce0fc0e411adc885", "64d39a6cce0fc0e411adc88c", "64d39a6cce0fc0e411adc88d"]
    else if (store.name.match(/atacadista/gi) || store.name.match(/supermercado/gi) || store.name.match(/atacarejo/gi) || store.name.match(/atacado/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc870", "64d39a6cce0fc0e411adc885", "64d39a6cce0fc0e411adc889"]
    else if (store.name.match(/ag[eê]ncia/gi) || store.name.match(/banco/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc870"]
    else if (store.name.match(/pernambucanas/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc870", "64d39a6cce0fc0e411adc885"]
    else if (store.name.match(/educacional/gi)) store.tags = ["64d39a6cce0fc0e411adc878", "64d39a6cce0fc0e411adc888"]
    else store.tags = ["64d39a6cce0fc0e411adc878"]

    store.isAtypicalContract ? store.isAtypicalContract = true : store.isAtypicalContract = false

    if (typeof store.contractTerm === 'string') store.contractTerm = excelDateToJSDate(73050).toString() // jan-2100
    else if (store.contractTerm) store.contractTerm = excelDateToJSDate(store.contractTerm).toString()

    if (!store.description) store.description = ''
    if (store['Proprietário']) {
      store.description += ', Proprietário: ' + store['Proprietário']
      delete store['Proprietário']
    }
    if (store.percentageOfOwnership) {
      store.description += ', percentual de loja: ' + (store.percentageOfOwnership * 100) + '%'
      delete store.percentageOfOwnership
    }
    if (store['Variável']) {
      store.description += ', Variável: ' + store['Variável']
      delete store['Variável']
    }
    if (store['Correção Mon.']) {
      store.description += ', Correção Mon.: ' + store['Correção Mon.']
      delete store['Correção Mon.']
    }

    // Convert string to number
    if (typeof store.monthlyRentInReais === 'string') store.monthlyRentInReais = parseFloat(store.monthlyRentInReais.replace(/[^\d.]/g, ''))

    // fix address
    store.address = ''
    store.address = store.street ? `${store.street}, ` : ''
    store.address += store.addressNumber ? `${store.addressNumber} - ` : ''
    store.address += store.neighborhood ? `${store.neighborhood}, ` : ''
    store.address += store.city ? `${store.city} - ` : ''
    store.address += store.state ? `${store.state}, Brasil` : ''
    delete store.street
    delete store.addressNumber
    delete store.neighborhood
    delete store.city
    delete store.state

    const { data } = await axios('https://simple-go-server-production.up.railway.app/external/autocomplete-address?q=' + store.address)
    store.address = data?.predictions[0]?.description


    try {
      await AssetService.create(store)
    } catch (err) { console.error(store.name, err) }
  }
  res.json(stores)
})

scriptRouter.get('/add-investidor-tag-all-companies', async (_, res) => {
  try {
    const { _id: tag } = await tagModel.findOne({ label: 'Investidor' })
    console.log('Tag found:', tag)

    const companies = await companyModel.find();
    for (let company of companies) {
      company.tags = [...company.tags, tag]
      await companyModel.updateOne({ _id: company._id }, company);
    }
    console.log('All companies have been updated.');
    res.send('All companies have been updated.');
  } catch (err) {
    console.error('Error updating companies:', err);
  }
})

scriptRouter.get('/refactor-asset-address', async (_, res) => {
  try {
    const assets: IAssetDocument[] = await assetModel.find();

    for (let asset of assets) {
      asset = asset.toObject()
      const { street, addressNumber, neighborhood, city, state } = asset;
      let addressParts = [];

      // Construct the street and address number part
      let streetAddress = '';
      if (street) {
        streetAddress += street;
      }
      if (addressNumber) {
        if (streetAddress) {
          streetAddress += ', ';
        }
        streetAddress += addressNumber;
      }
      if (streetAddress) {
        addressParts.push(streetAddress);
      }

      // Construct the neighborhood and city part
      let neighborhoodCity = '';
      if (neighborhood) {
        neighborhoodCity += neighborhood;
      }
      if (city) {
        if (neighborhoodCity) {
          neighborhoodCity += ', ';
        }
        neighborhoodCity += city;
      }
      if (neighborhoodCity) {
        addressParts.push(neighborhoodCity);
      }

      // Add the state part
      if (state) {
        addressParts.push(state);
      }

      // Join all the parts with ' - '
      let address = addressParts.join(' - ');

      // Always add ', Brazil' at the end
      address += ', Brasil';

      // Update the asset with the new address
      asset.address = address;

      // Remove the old address fields
      asset.street = undefined;
      asset.addressNumber = undefined;
      asset.neighborhood = undefined;
      asset.city = undefined;
      asset.state = undefined;

      // Save the updated asset
      await assetModel.updateOne({ _id: asset._id }, asset);
    }
    console.log('All assets have been updated.');
    res.send('All assets have been updated.');
  } catch (err) {
    console.error('Error updating assets:', err);
  }
}
)

