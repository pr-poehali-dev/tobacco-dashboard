import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ClientsSection = () => {
  const clients = [
    { id: 1, name: 'Дмитрий Иванов', phone: '+7 (999) 123-45-67', purchases: 15, total: 12500, discount: 5 },
    { id: 2, name: 'Анна Петрова', phone: '+7 (999) 234-56-78', purchases: 8, total: 7800, discount: 3 },
    { id: 3, name: 'Сергей Козлов', phone: '+7 (999) 345-67-89', purchases: 23, total: 18900, discount: 10 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Клиенты</h2>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500">
          <Icon name="UserPlus" className="w-4 h-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                  <p className="text-gray-400 mb-1">{client.phone}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-400">Покупок</p>
                      <p className="text-lg font-bold">{client.purchases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Сумма</p>
                      <p className="text-lg font-bold text-green-400">₽{client.total}</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400">Скидка {client.discount}%</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsSection;
