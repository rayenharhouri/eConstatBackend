import InsuranceModel from '../Models/Insurance.model.js'

export async function addNewInsurance(req, res) {
  try {
    const {
      name,
      numContrat,
      agency,
      validityFrom,
      validityTo,
      image,
    } = req.body
    if (!(name && numContrat && agency && validityFrom && validityTo)) {
      res.status(400).json({ message: 'All Fields are required' })
    }
    const existantInsurance = await InsuranceModel.findOne({ numContrat })
    if (existantInsurance) {
      return res.status(409).send('Contrat Already exist')
    }
    const insurance = await InsuranceModel.create({
      name,
      numContrat,
      agency,
      image,
      validityFrom,
      validityTo,
    })
    res.send(insurance)
  } catch (err) {
    console.log(err)
  }
}

