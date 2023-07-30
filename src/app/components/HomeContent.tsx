import { useState } from 'react';
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MdHeight } from 'react-icons/md';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}
function TabPanel(props: any) {
  const { children, value, index } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className=' h-auto bg-white p-4 m-5 rounded-xl shadow '
      style={{width:'90%'}}
    >
      {value === index && (
        <div className=''>
          {children}
        </div>
      )}
    </div>
  );
}

const products = [
  {
    id: 1,
    name: 'SkinCare',
    price: 9.99,
    image: 'https://i.pinimg.com/736x/ea/a2/40/eaa24087c8478855958bd112db3dc9ae.jpg',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Para Ellos',
    price: 19.99,
    image: 'https://i.pinimg.com/736x/ea/a2/40/eaa24087c8478855958bd112db3dc9ae.jpg',
    rating: 3.5,
  },
  /* {
    id: 3,
    name: 'Jabones',
    price: 29.99,
    image: 'https://i.pinimg.com/736x/ea/a2/40/eaa24087c8478855958bd112db3dc9ae.jpg',
    rating: 5.0,
  }, */
];

function ProductCard({ product }: { product: Product }) {
  const width = 100;
  const height = 100;
  return (
    <div className=" flex flex-col w-[120px] bg-white rounded-lg shadow-lg">
      <div className="relative ">
        <Image
          className="relative h-[100px] w-[100px] ml-1 object-cover"
          src={product.image}
          alt={product.name}
          width={width}
          height={height}
        />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
        <div className="flex items-center mt-1 ">
          <span className="text-yellow-500 mr-1">{product.rating}</span>
          <svg viewBox="0 0 24 24" width={20} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#e3b63b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
      </div>
    </div>
  );
}

function ProductSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };



  return (
    <div className=" w-[400px]  ">
      <div className="flex justify-around">
        {/*  <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={handlePrevClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <svg
              className="h-8 w-8 fill-current text-gray-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0c-.552 0-1.044.185-1.414.555L5.05 4.636c-.78.78-.78 2.047 0 2.828l4.243 4.243c.39.39.902.585 1.414.585s1.024-.195 1.414-.585l4.243-4.243c.78-.78.78-2.047 0-2.828L11.414.555C11.044.185 10.552 0 10 0zm0 2.828L12.828 5 10 7.828 7.172 5 10 2.828z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button> */}
        <motion.div
          className=" "
          style={{ width: '100%' }}
          initial={{ y: '-10%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-[200px] justify-around w-[300px]">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className=''

                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={handleNextClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <svg
              className="h-8 w-8 fill-current text-gray-500"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0c-.552 0-1.044.185-1.414.555L5.05 4.636c-.78.78-.78 2.047 0 2.828l4.243 4.243c.39.39.902.585 1.414.585s1.024-.195 1.414-.585l4.243-4.243c.78-.78.78-2.047 0-2.828L11.414.555C11.044.185 10.552 0 10 0zm0 2.828L12.828 5 10 7.828 7.172 5 10 2.828z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button> */}
      </div>
    </div>
  );
}

function Tabs() {


  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="tabs items-center h-screen flex flex-col  justify-center w-screen">
      <div className=' h-1/5 w-full z-10 bg-gradient-to-t from-[#a9765c]'
      ></div>
      <div className='flex justify-around text-center p-3 m-4  '>
        <div className="tab " onClick={(event) => handleChange(event, 0)} data-target="panel-0">
          SkinCare
        </div>
        <div className="tab" onClick={(event) => handleChange(event, 1)} data-target="panel-1">
          Productos
        </div>
        <div className="tab" onClick={(event) => handleChange(event, 2)} data-target="panel-2">
          Tips
        </div>
      </div>
      <div id="panels" className='flex h-[300px] w-full  '>
        <TabPanel value={value} index={0}>
          <div>
            <h1>Cuidado de la Piel</h1>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda enim voluptates nulla molestias quo officia. Sunt minus totam repellendus eaque ipsam quasi esse iure accusantium, rem eos distinctio sed labore.</p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <h1>Productos</h1>
            <br />
            <ProductSlider />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            <h1>Recomendaciones</h1>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda enim voluptates nulla molestias quo officia. Sunt minus totam repellendus eaque ipsam quasi esse iure accusantium, rem eos distinctio sed labore.</p>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
export default Tabs;