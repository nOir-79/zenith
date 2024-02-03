const db = require('./database');
const morgan=require('morgan');
const express=require('express');
const router=require('express-promise-router')();
const exp = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const { as } = require('pg-promise');
var bcrypt = require('bcryptjs');



router.use(express.urlencoded({ extended: true }));

async function db_query(query,params) {
    let res=await db.query(query,params)
    .then((result) => {
       console.log(":Checking result in db_quesry");
       //console.log( result);
       return result;
    });
    console.log("Checkiing response");
    //console.log(res);
    return res;
}

router.get('/shop',async(req,res)=>{
  const query="SELECT * FROM customer";
  const params=[];
  const result=await db_query(query,params);
  console.log("we are here");
  console.log(result);
  res.status(200).json(result);
});


router.post('/customersignup', async (req, res) => {
      console.log(req.body);
      const { name, phone_number, email,birthday,password,gender} = req.body; // Extract form data
      const salt = await bcrypt.hash(password,10);
      console.log(salt);
      const query="insert into customer (name, phone_number, e_mail,birtday,hash_password,gender)values($1,$2,$3,TO_DATE($4, 'YYYY/MM/DD'),$5,$6)";
      const values=[name, phone_number, email,birthday,salt,gender];
      try{
        const result=await db_query(query,values);
        console.log(result);
        res.status(200).send('Row added successfully!');
      }
      catch(error){
        console.error('Error adding row:', error);
        res.status(500).send('Error adding row to the database.');
      }
});


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

router.post('/customer_login', async (req, res) => {
  const { phone_number,password } = req.body;
  console.log(req.body);
  console.log(phone_number);
  const login_query=`SELECT * FROM customer WHERE phone_number = $1`; 
  const values = [phone_number]; 
  try {
    const user = await db_query(login_query, values);
    console.log(user);
    if(user){

      const comp=await bcrypt.compare(password,user[0].hash_password);
      if(comp){
        console.log('login successful', comp);
        res.status(200).send('login successfully!');
      }
      else{
        res.status(500).send('Error verifying.');
      }
    }
    else{
      console.log('login unsuccessful',comp);
      res.status(200).send('login failed');
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).send('Error logging in to the database.');
  }
});

router.post('/shoplogin', async (req, res) => {
    const { license_no,password } = (req.body);
    const login_query="SELECT * FROM SHOP WHERE license_no=$1 and password=$2"; 
    const values = [license_no, password]; 
    try {
      const result = await db_query(login_query, values);
      if(result.length==0){
        res.status(500).send('Error verifying.');
      }
      else{
        console.log('login successful', result);
        res.status(200).send(result);
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

router.get('/shop/add_product_page',async (req,res)=>{
  try{
    const query="select sub_category from category where sub_id=any (select distinct category from category)";
    const result= await db_query(query,[]);
    console.log("Checking result");
    console.log(result);
    const categories=[];
    for (const row of result) {
        //console.log(typeof(row.sub_category));
        categories.push(row.sub_category);
    }
    //console.log(categories[1]);
    const final_result=[];
    
    let i=0;
    for(const category of categories){
      const f_result=[];
        const values=[category];
        console.log(values);
        const sub_query="select sub_id,category,sub_category from category where category=(select sub_id from category where sub_category=$1)";
        const sub_result= await db_query(sub_query,values);
        //console.log(sub_result);
        for(const row of sub_result){
            const sub_category={id:row.sub_id,name:row.category,cat:row.sub_category};
            //console.log(sub_category);
            f_result.push(sub_category);
        }
        const object={key:category,value: f_result};
        console.log(object);
        final_result.push(object);
    }
    console.log(final_result);
    res.status(200).json(final_result)
  }catch(error){
    console.error('Error deleting row:', error);
    res.status(500).send('Error deleting row from the database.');
  }
});

router.post('/shop/add_product', async (req, res) => {
  //const temp=(req.body);
  const { product_name,brand_name,id,price,availability,category,discount,license_no } = req.body;

  // Update the row in the database
  const updateQuery = 'INSERT INTO product (product_name,brand_name,id,price) VALUES ($1,$2,$3,$4);commit;';
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


router.post('/shopshow_products',async(req,res)=>{
  const {license_no}=req.body;
  console.log(license_no);
  const query="select d.discount,d.availability,p.product_name,p.brand_name,p.price from (select * from shop  where license_no=$1) s join discount d on s.license_no=d.shop_license join product p on d.product_id=p.id";
  const values = [license_no];
  try{
    const result=await db_query(query,values);
    console.log('Row deleted successfully:', result);
    res.status(200).send(result);
  }
  catch(error){
    console.error('Error showing products', error);
    res.status(500).send('Error showing products from the database.');
  }
})


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


router.post('/shop_delete_product', async (req, res) => {
    const { product_id,shop_license } = req.body;
    console.log(product_id);
    console.log(shop_license);
    try{
      const deleteQuery = 'DELETE FROM DISCOUNT WHERE product_id = $1 and shop_license=$2';
      const values = [product_id,shop_license];
      const result = await db_query(deleteQuery, values);
      console.log('Row deleted successfully:', result);
      res.status(200).send('Row deleted successfully!');
    }
    catch(error){
      console.error('Error deleting row:', error);
      res.status(500).send('Error deleting row from the database.');
    }
})


router.get('/',async(req,res)=>{
    
    try{
      const query="select sub_category from category where sub_id=any (select distinct category from category)";
      const result= await db_query(query,[]);
      console.log("Checking result");
      console.log(result);
      const categories=[];
      for (const row of result) {
          //console.log(typeof(row.sub_category));
          categories.push(row.sub_category);
      }
      //console.log(categories[1]);
      const final_result=[];
      
      let i=0;
      for(const category of categories){
        const f_result=[];
          const values=[category];
          console.log(values);
          const sub_query="select sub_id,category,sub_category from category where category=(select sub_id from category where sub_category=$1)";
          const sub_result= await db_query(sub_query,values);
          //console.log(sub_result);
          for(const row of sub_result){
              const sub_category={id:row.sub_id,name:row.category,cat:row.sub_category};
              //console.log(sub_category);
              f_result.push(sub_category);
          }
          const object={key:category,value: f_result};
          console.log(object);
          final_result.push(object);
      }
      console.log(final_result);
      res.status(200).json(final_result)
    }catch(error){
      console.error('Error deleting row:', error);
      res.status(500).send('Error deleting row from the database.');
    }
}); 


//router.post('shop/show_products',async(req,res)=>{


router.post('/productsundersubcategory',async(req,res)=>{
      let {name}=req.body;
      console.log(name);
      name=name.replace("'", " ");
      console.log(name.toLowerCase());
      const product_query="select * from (select * from category  where lower(replace(category.sub_category,'''',' '))=$1) c join product_category pc on c.sub_id=pc.s_id  join product p on pc.product_id=p.id join discount d on d.product_id=p.id;";
      const product_result=await db_query(product_query,[name.toLowerCase()]);
      console.log(product_result);
      res.status(200).json(product_result);
});



router.post('/product_info',async(req,res)=>{
  const {product_id,shop_license}=req.body;
  const query="select * from (select * from discount where product_id=$1 and shop_license=$2) d join product on d.product_id=product.id";
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
  let {text}=req.body;
  console.log(text);
  text="%"+text.toUpperCase()+"%";
  console.log(text);
  const query="select * from  (select * from product  where upper(product_name) like $1) p join discount d on d.product_id=p.id join shop s on s.license_no=d.shop_license";
  try{
    const result=await db.query(query,[text]);
    console.log(result);
    if(result.length==0){
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

