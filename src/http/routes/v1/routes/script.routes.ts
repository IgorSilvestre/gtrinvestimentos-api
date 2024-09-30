import { Router } from 'express'
import { assetModel } from '../../../../modules/asset/infra/mongo/assetSchema';
import { IAssetDocument } from '../../../../modules/asset/interfaces-validation/IAssetDocument';
import { tagModel } from '../../../../modules/tag/infra/mongo/tagSchema';
import { companyModel } from '../../../../modules/company/infra/mongo/companySchema';

export const scriptRouter = Router()


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

