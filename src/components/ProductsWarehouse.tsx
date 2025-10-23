import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const ProductsSection = () => {
  const products = [
    { id: 1, name: 'Вейп IQOS', category: 'Вейпы', price: 2350, stock: 15 },
    { id: 2, name: 'Elf Bar 5000', category: 'Одноразки', price: 650, stock: 45 },
    { id: 3, name: 'Табак Adalya', category: 'Табак', price: 890, stock: 28 },
    { id: 4, name: 'Red Bull 250ml', category: 'Энергетики', price: 180, stock: 120 },
    { id: 5, name: 'Жижа Salt 30ml', category: 'Жижи', price: 450, stock: 67 },
    { id: 6, name: 'Кальян Amy', category: 'Кальяны', price: 5500, stock: 8 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Товары</h2>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <Icon name="PackagePlus" className="w-4 h-4 mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <Badge className="mb-3">{product.category}</Badge>
              <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-green-400">₽{product.price}</p>
                  <p className="text-sm text-gray-400 mt-1">Остаток: {product.stock} шт</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Icon name="Edit" className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const WarehouseSection = () => {
  const warehouse = [
    { category: 'Вейпы', items: 45, value: 125000, lowStock: 3 },
    { category: 'Одноразки', items: 156, value: 89000, lowStock: 8 },
    { category: 'Табак', items: 89, value: 67000, lowStock: 2 },
    { category: 'Энергетики', items: 234, value: 42000, lowStock: 0 },
    { category: 'Жижи', items: 123, value: 55000, lowStock: 5 },
    { category: 'Кальяны', items: 23, value: 145000, lowStock: 1 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Склад</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouse.map((item, index) => (
          <Card key={index} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{item.category}</h3>
                {item.lowStock > 0 && (
                  <Badge className="bg-red-500/20 text-red-400">
                    <Icon name="AlertTriangle" className="w-3 h-3 mr-1" />
                    {item.lowStock}
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Товаров</p>
                  <p className="text-2xl font-bold">{item.items} шт</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Стоимость</p>
                  <p className="text-xl font-bold text-green-400">₽{item.value.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
