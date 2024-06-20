import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { D } from '@uploadthing/react/types-f6db134c';

export interface ProductProps {
  /*
    id: '0o02051402',
    createdAt: '2020-12-01T00:00:00.000Z',
    name: 'Tasty Metal Shirt',
    companyName: 'nike',
    category: 'Books',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
    sku: '52442',
    listPrice: 410.00,
    price: 410.00,
    status: 'Pending',
    rating: [4, 5, 3, 2],

    point: 100,
    stock: 100,
    sales: 30,
    inquiry, 10,
  */

  id: string,
  createdAt: Date,
  name: string,
  companyName: string,
  shopId: string,
  category: string,
  avatar: string,
  images: string[],
  description: string,
  options: string[],
  addProducts: string[],


  sku: string,
  listPrice: number,
  price: number,
  status: string,
  rating: number[],
  point: number,
  stock: number,
  sales: number,
  inquiry: number,


}

export interface ResultProps {
  _id: string;
  products: ProductProps[];
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    // Native remark plugin that parses markdown into MDX
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);

  return mdxSource;
}

export const placeholderBio = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;






/* insertOne */
export async function insertOne(
  product: ProductProps,
): Promise<string> {
  
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('certificates');

  // random id
  product.id = Math.floor(100000 + Math.random() * 900000).toString();
  product.createdAt = new Date();


  const result = await collection.insertOne(product);

  //return result.insertedId;

  return product.id;
}







export async function getAll(
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

  //shopId: string,

): Promise<ProductProps[]> {

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('certificates');

  const query = q === null ? '' : q;


  
  //console.log('getAll shopId: ' + shopId);

  /*
  _id: 6672fd308d0db98c8920ea5c
  name: "ㅎㅎㅎ"
  ompanyName: ""
  category: ""
  avatar: "https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/BO3wvcF-e6O19o…"
  description: "<p>하하ㅏ</p>"
  sku: "2321"
  listPrice: 0
  price: 0
  id: "515725"
  createdAt: 2024-06-19T15:45:52.963+00:00
  */

  return await collection
    .aggregate<ProductProps>([
        
        // sort by sort param
  
        {
          $sort: {
            [
              sort === null ? 'createdAt' : sort
            ]: parseInt(
              order === null ? '-1' : order
            )
          }
        },
  
        // search by query param
        {
          $match: {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { companyName: { $regex: query, $options: 'i' } },
              { category: { $regex: query, $options: 'i' } },
              { sku: { $regex: query, $options: 'i' } },
            ]
          }
        },
        
        {
          $limit: limit,
          //////$skip: (page - 1) * limit, // skip the first n documents
  
        },
  
        
        
      ])
      .toArray();

      
      





  /*
  return await collection
    .aggregate<ProductProps>([

      // sort by sort param

      {
        $sort: {
          [
            sort === null ? 'createdAt' : sort
          ]: parseInt(
            order === null ? '-1' : order
          )
        }
      },

      // search by query param
      // and if shopId is not '', filter by shopId
      // and if shopId is '', filter by query param
      {
        $match: {

          $and: [
            {
              $or: [
                { name: { $regex: query, $options: 'i' } },
                { companyName: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { sku: { $regex: query, $options: 'i' } },
              ]
            },
            {
              $or: [
                { shopId: { $regex: shopId, $options: 'i' } },
                { shopId: '' },
              ]
            }
          ]


        }
      },


      // lookup shop and add shop info

      
      {
        $lookup: {
          from: 'shops',
          localField: 'shopId',
          foreignField: 'id',
          as: 'shop',
        }
      },


      // unwind shop
      {
        $project: {
          id: 1,
          createdAt: 1,
          name: 1,
          companyName: 1,
          shopId: 1,
          category: 1,
          avatar: 1,
          images: 1,
          description: 1,
          options: 1,
          addProducts: 1,
          sku: 1,
          listPrice: 1,
          price: 1,
          status: 1,
          rating: 1,
          point: 1,
          stock: 1,
          sales: 1,
          inquiry: 1,
          shop: { $arrayElemAt: ['$shop', 0] },
          
        }
      },
        


      
      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },

      
      
    ])
    .toArray();
  */

  
}






export async function getAllByShopId(
  shopId: string,
  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

): Promise<ProductProps[]> {

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('products');

  const query = q === null ? '' : q;


  console.log('getAllByShopId shopId: ' + shopId);
   
  return await collection
    .aggregate<ProductProps>([


      // filter by shopId
      {
        $match: {
          shopId: shopId
        }
      },
      
      // sort by sort param

      {
        $sort: {
          [
            sort === null ? 'createdAt' : sort
          ]: parseInt(
            order === null ? '-1' : order
          )
        }
      },

      // search by query param
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { companyName: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { sku: { $regex: query, $options: 'i' } },
          ]
        }
      },
      
      {
        $limit: limit,
        //////$skip: (page - 1) * limit, // skip the first n documents

      },

      
      
    ])
    .toArray();

  
}





export async function getCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('products');
  return await collection.countDocuments();
}



export async function update(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('lefimall').collection('products');
  return await collection.updateOne({ username }, { $set: { bio } });
}



export async function getOne(id: string): Promise<ProductProps | null> {
  console.log('getUser id: ' + id);

  const client = await clientPromise;
  const collection = client.db('lefimall').collection('products');
  const results = await collection.findOne<ProductProps>(
    { id },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}




export async function updateBasic(
  id: string,
  name: string,
  companyName: string,
  shopId: string,
  category: string,
  sku: string,
  avatar: string,
  ) {
    const client = await clientPromise;
    const collection = client.db('lefimall').collection('products');
  
    return await collection.updateOne(
      {
        id
      },
      {
        $set:
        {
          name,
          companyName,
          shopId,
          category,
          sku,
          avatar,
  
        }
      }
  
  )}



export async function updateOne (
  {
    id,
    name,
    companyName,
    shopId,
    category,
    avatar,
    images,
    description,
    options,
    addProducts,
    sku,
    listPrice,
    price,
    status,
    rating,
    point,
    stock,
    sales,
    inquiry,
  }: ProductProps,
  ) {
    const client = await clientPromise;
    const collection = client.db('lefimall').collection('products');
  
    return await collection.updateOne(
      {
        id
      },
      {
        $set:
        {
          name,
          companyName,
          shopId,
          category,
          avatar,
          images,
          description,
          options,
          addProducts,
          sku,
          listPrice,
          price,
          status,
          rating,
          point,
          stock,
          sales,
          inquiry,
  
        }
      }
  
  )}  
  