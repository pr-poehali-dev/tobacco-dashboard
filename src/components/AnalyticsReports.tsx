import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const AnalyticsSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Аналитика</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Выручка за месяц', value: '₽1,245,000', change: '+18%', gradient: 'from-orange-500 to-pink-500' },
          { label: 'Средний чек', value: '₽780', change: '+5%', gradient: 'from-cyan-500 to-blue-500' },
          { label: 'Продаж в день', value: '52', change: '+12%', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Новых клиентов', value: '127', change: '+23%', gradient: 'from-green-500 to-emerald-500' },
        ].map((stat, index) => (
          <Card key={index} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <Icon name="TrendingUp" className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Продажи по категориям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Вейпы', sales: 450000, percent: 36 },
              { name: 'Одноразки', sales: 320000, percent: 26 },
              { name: 'Табак', sales: 280000, percent: 22 },
              { name: 'Энергетики', sales: 120000, percent: 10 },
              { name: 'Кальяны', sales: 75000, percent: 6 },
            ].map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-gray-400">₽{cat.sales.toLocaleString()} ({cat.percent}%)</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ReportsSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Отчеты</h2>

      <div className="grid gap-6">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Отчет по продажам за день</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Выручка</p>
                <p className="text-2xl font-bold text-green-400">₽47,350</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Продано</p>
                <p className="text-2xl font-bold">156 шт</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Заказов</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Средний чек</p>
                <p className="text-2xl font-bold">₽1,127</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
              <Icon name="Download" className="w-4 h-4 mr-2" />
              Скачать отчет
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Отчет по сотрудникам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Иван Петров', sales: 15200, orders: 18 },
                { name: 'Мария Сидорова', sales: 18900, orders: 24 },
                { name: 'Алексей Коваль', sales: 13250, orders: 15 },
              ].map((emp, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm text-gray-400">{emp.orders} заказов</p>
                  </div>
                  <p className="text-xl font-bold text-green-400">₽{emp.sales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
