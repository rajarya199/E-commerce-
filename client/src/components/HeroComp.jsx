import { ProductSlider } from './ProductSlider'
  const products = [
    {
      id: 1,
      name: 'Vintage Leather Watch',
      description:
        'Handcrafted with genuine leather straps and brass details. A timeless accessory for the modern gentleman.',
      price: 129.99,
      image:
        'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    },
    {
      id: 2,
      name: 'Artisan Coffee Maker',
      description:
        'Slow-drip perfection with hand-blown glass and aged copper accents. Elevate your morning ritual.',
      price: 89.99,
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    },
    {
      id: 3,
      name: 'Handwoven Wool Throw',
      description:
        'Each blanket tells a story, woven with traditional techniques and premium merino wool.',
      price: 149.99,
      image:
        'https://images.unsplash.com/photo-1543248939-ff40856f65d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    },
    {
      id: 4,
      name: 'Brass Desk Lamp',
      description:
        'Salvaged brass with adjustable arm and warm Edison bulb. A statement piece for your workspace.',
      price: 199.99,
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    },
  ]
const HeroComp = () => {
  return (
    
            <div >
      <ProductSlider products={products} />
    </div>

  )
}

export default HeroComp