const db = require('./database');
const morgan=require('morgan');
const express=require('express');
const router=require('express-promise-router')();
const exp = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const { as } = require('pg-promise');

router.use(express.urlencoded({ extended: true }));

async function db_query(query,params) {
    let res=db.query(query)
    .then((result) => {
       //console.log( result);
       return result;
    });
    return res;
}

// router.get('/shop',async(req,res)=>{
//   const query="SELECT * FROM SHOP";
//   const params=[];
//   const result=await db_query(query,params);
//   console.log("we are here");
//   res.status(200).json(result);
// });


// router.post('/shop/:license_no',async(req,res)=>{
//   const { license_no } = (req.body);
//   const values = [license_no];
//   console.log(values);
//   const query="SELECT * FROM SHOP WHERE license_no=$1";
//   // const result=await db_query(query,params);
//   // res.status(200).json(result);
//   try {
//     const result = await db_query(query, values);
//     //console.log(result);
//     console.log('shop verified  successfully:', result);
//     res.status(200).send('shop verified successfully!');
//   } catch (error) {
//     console.error('Error verifying:', error);
//     res.status(500).send('Error verifying.');
//   }
// });

// router.post('/shop', async (req, res) => {
//   //const temp=(req.body);
//   const data = {
//     name: "startech",
//     phone_number: "123780",
//     email: "a@gmail.com",
//     address: "1, rankin",
//     license_no: "234589",
//   };
//   const { name, phone_number, email,address,license_no} =data; // Extract form data
//   //console.log(temp);
//   //console.log(req.headers);

//   // Perform database insertion
//   const query = 'INSERT INTO SHOP (name,phone_number,email,address,license_no,category) VALUES ($1,$2,$3,$4,$5,$6)'; // Replace YourTableName with your actual table name
//   const values = [name, phone_number, email,address,license_no,category];

//   try {
//     const result = await db_query(query, values);
//     console.log('Row added successfully:', result);
//     res.status(200).send('Row added successfully!');
//   } catch (error) {
//     console.error('Error adding row:', error);
//     res.status(500).send('Error adding row to the database.');
//   }
// });

router.post('/customer/login', async (req, res) => {
  const { phone_no,password } = (req.body);
  const login_query="SELECT * FROM CUSTOMER WHERE phone_number=$1 and password=$2"; 
  const values = [phone_no, password]; 
  try {
    const result = await db_query(login_query, values);
    if(result.rows.length==0){
      res.status(500).send('Error verifying.');
    }
    else{
      console.log('login successful', result);
      res.status(200).send('loginsuccessfully!');
    }
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).send('Error updating row to the database.');
  }
});

router.post('/shop/login', async (req, res) => {
    const { license_no,password } = (req.body);
    const login_query="SELECT * FROM SHOP WHERE license_no=$1 and password=$2"; 
    const values = [license_no, password]; 
    try {
      const result = await db_query(login_Query, values);
      if(result.rows.length==0){
        res.status(500).send('Error verifying.');
      }
      else{
        console.log('login successful', result);
        res.status(200).send('loginsuccessfully!');
      }
    } catch (error) {
      console.error('Error updating row:', error);
      res.status(500).send('Error updating row to the database.');
    }
});
router.post('/shop/update', async (req, res) => {
  //const temp=(req.body);
  const { license_no, phone_number,email, address } = req.body;

  // Update the row in the database
  const updateQuery = 'UPDATE SHOP SET phone_number = $2, phone_number = $3,email = $4 WHERE license_no = $1';
  const values = [license_no, phone_number,email, address];
  try {
    const result = await db.query(updateQuery, values);
    console.log('Row updated successfully:', result);
    res.status(200).send('Row updated successfully!');
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).send('Error updating row to the database.');
  }
});


result.post('/shop/add_product', async (req, res) => {
  //const temp=(req.body);
  const { product_name,brand_name,id,price,availability,category,discount } = req.body;

  // Update the row in the database
  const updateQuery = 'INSERT INTO PRODUCT (product_name,brand_name,id,price) VALUES ($1,$2,$3,$4)';
  const values = [product_name,brand_name,id,price];
  try{
    db.query(updateQuery, values).then((result) => {
      const uquery='INSERT INTO DISCOUNT (product_id,shop_license,availability,discount) VALUES ($1,$2,$3,$4)';
      const uvalues=[id,license_no,availability,discount];
      return db.query(uquery,uvalues);
    }).then((result) => {
      const uquery1="insert into product_category (s_id,product_id) values((select sub_id from category where sub_category=$1),$2) "
      const uvalues1=[category,id];
      return db.query(uquery1,uvalues1);
    })
  }
  catch(error) {
    console.error('Error updating row:', error);
    res.status(500).send('Error updating row to the database.');
  }
});


router.post('/shop/signout', async (req, res) => {
  //const temp=(req.body);
  const { license_no } = req.body;

  // Update the row in the database
  const deleteQuery = 'DELETE FROM SHOP WHERE license_no = $1';
  const deleteQuery2 = 'DELETE FROM DISCOUNT WHERE license_no = $1';
  const values = [license_no];
  try {
    const result = await db.query(deleteQuery, values);
    const res=await db.query(deleteQuery2,values);
    console.log('Row deleted successfully:', result);
    res.status(200).send('Row deleted successfully!');
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).send('Error deleting row from the database.');
  }
});


router.get('/',async(req,res)=>{
    const query="select category from category where sub_id=any (select distinct category_id from category)";
    const result=db_query(query,[]);
    const categories=[];
    for (const row of result.rows) {
        categories.push(row[0]);
    }
    let i=0;
    for(const category of categories){
        const sub_query="select sub_id,name from category where category_id=(select sub_id from category where name=category)";
        const sub_result=db_query(sub_query,[]);
        for(const row of sub_result.rows){
            const sub_category={id:row[0],name:row[1]};
            result[i].push(sub_category);
        }
    }
    res.status(200).json(result);
});


router.post('/productsundersubcategory',async(req,res)=>{
      const {sub_id}=req.body;
      const product_query="select p.name,d.shop_license,p.id from product_category pc where pc.s_id=$1 join product p on pc.product_id=p.id join discount d on d.product_id=p.id";
      const product_result=db_query(product_query,[sub_id]);
      res.status(200).json(product_result);
})



router.post('/product_info',async(req,res)=>{
  const {product_id,shop_license}=req.body;
  const query="select * from discount where product_id=$1 and shop_license=$2 join product on product.product_id=discount.product_id";
  const params=[product_id,shop_license];
  try {
    const result = await db.query(query, params);
    console.log('Row deleted successfully:', result);
    res.status(200).send('Row deleted successfully!');
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).send('Error deleting row from the database.');
  }
});

router.post('/search_something',async(req,res)=>{
  const {text}=req.body;
  text='%'+text+'%';
  const query="select * from  product p where product_name like text join shop s on p.id=s.product_id";
  try{
    const result=await db.query(query,[text]);
    if(result.rows.length==0){
      res.status(500).send('Nothing to be shown');
    }
    else{
      res.status(200).json(result);
    }
  }
  catch(error){
    console.error('Error deleting row:', error);
    res.status(500).send('Error deleting row from the database.');
  }
})





const app=express();
app.use(express.json());
app.use(cors());
app.options('*',cors());
app.use(morgan('dev'));
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3000,()=>{
  console.log('Server is listening on port 3000');
});

