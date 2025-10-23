import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const POSSection = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products: Product[] = [
    { id: 1, name: 'Вейп IQOS', price: 2350, category: 'Вейпы', stock: 15 },
    { id: 2, name: 'Elf Bar 5000', price: 650, category: 'Одноразки', stock: 45 },
    { id: 3, name: 'Табак Adalya', price: 890, category: 'Табак', stock: 28 },
    { id: 4, name: 'Red Bull 250ml', price: 180, category: 'Энергетики', stock: 120 },
    { id: 5, name: 'Жижа Salt 30ml', price: 450, category: 'Жижи', stock: 67 },
    { id: 6, name: 'Кальян Amy', price: 5500, category: 'Кальяны', stock: 8 },
  ];

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Касса</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Input
            placeholder="Поиск товара..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border-white/10"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
              <Card 
                key={product.id}
                className="bg-black/40 backdrop-blur-sm border-white/10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <Badge className="mb-2">{product.category}</Badge>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-orange-400">₽{product.price}</p>
                  <p className="text-xs text-gray-400 mt-1">В наличии: {product.stock}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-fit sticky top-8">
          <CardHeader>
            <CardTitle>Корзина</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Корзина пуста</p>
            ) : (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.quantity} × ₽{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₽{item.price * item.quantity}</p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 px-2 mt-1"
                        >
                          <Icon name="X" className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg">Итого:</span>
                    <span className="text-2xl font-bold text-orange-400">₽{total}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                    Оформить продажу
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default POSSection;
