# Сериализация/десериализация на `TypeScript`

Попытка написать сериализацию и десериализацию на `TypeScript` без декораторов и метаданных.

Плюсы:
1. Можно проводить операции с объектами любого класса - не надо писать декораторов с описанием типов.

Минусы:
1. Класс должен содержать конструктор по умолчанию, который должен создавать объект со всеми вложенными объектами.
1. Вложенные массивы должны содержать минимум один объект, чтобы из него извлечь конструктор.
1. Вложенные массивы должны содержать объекты одного класса (либо примитивы).

### TODO
 - [ ] Тесты
 - [ ] Ошибка обхода цикличного объекта выводится в консоль, следует использовать кастомный логгер