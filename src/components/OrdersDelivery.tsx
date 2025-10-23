import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const OrdersSection = () => {
  const orders = [
    { id: '#3551', client: 'Дмитрий Иванов', items: 3, total: 3450, status: 'Новый', date: '23.10.2024' },
    { id: '#3550', client: 'Анна Петрова', items: 1, total: 180, status: 'Завершен', date: '23.10.2024' },
    { id: '#3549', client: 'Сергей Козлов', items: 5, total: 8900, status: 'В обработке', date: '22.10.2024' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Заказы</h2>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Новый заказ
        </Button>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-cyan-400">{order.id}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.status === 'Завершен' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Новый' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-1">{order.client}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">{order.items} товара</p>
                  <p className="text-2xl font-bold text-orange-400">₽{order.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const DeliverySection = () => {
  const deliveries = [
    { id: '#D124', courier: 'Алексей', address: 'ул. Ленина, 45', status: 'В пути', time: '14:30', items: 2 },
    { id: '#D123', courier: 'Мария', address: 'пр. Мира, 12', status: 'Доставлено', time: '13:15', items: 1 },
    { id: '#D122', courier: 'Иван', address: 'ул. Советская, 78', status: 'Ожидает', time: '15:00', items: 4 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Доставка</h2>

      <div className="grid gap-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-purple-400">{delivery.id}</h3>
                    <Badge className={
                      delivery.status === 'Доставлено' ? 'bg-green-500/20 text-green-400' :
                      delivery.status === 'В пути' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }>
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Icon name="User" className="w-4 h-4" />
                    <span>Курьер: {delivery.courier}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Icon name="MapPin" className="w-4 h-4" />
                    <span>{delivery.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Icon name="Clock" className="w-4 h-4" />
                    <span>{delivery.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Товаров</p>
                  <p className="text-2xl font-bold">{delivery.items}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
