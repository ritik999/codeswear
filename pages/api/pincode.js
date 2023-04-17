// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes={
    '201005':['Shalimar Garden','Ghaziabad'],
    '110003':['Delhi','Delhi'],
    '560017':['Bangalore','Karnataka'],
  }
    res.status(200).json(pincodes);
  }
  