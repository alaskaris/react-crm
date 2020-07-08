// @ts-ignore
export interface Entity {
  id: number;
  text?: string;
  value?: number;
}

export interface Category extends Entity {
  name: string;
  parentId: string;
}

// export interface UserInfo extends Entity {
//   messages: string[];
//   notifications: string[];
//   tasks: string[];
// }

export interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  mobile: string;
  homephone?: string;
  workphone?: string;
}

export interface Customer extends User {
  membership: boolean;
  rewards: number;
  orders?: string[];
  orderAmount: number;
  files?: File[];
  origin: string;
  activitysector: string;
  activitysetup: string;
  type: string;
  project: string;
  physicallocation: string;
  sex: string;
  status: string;
  age?: number;
  firstcontact: string;
  internalfollowup: string;
  contactdate?: Date;
  ackdate?: Date;
  ackindicator: string;
}

export interface Address extends Entity {
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface Status extends Entity {
  name: string;
}

export interface Order extends Entity {
  reference: string;
  customerId: number;
  customer: Customer;
  customerName: string;
  products: Product[];
  amount: number;
  quantity: number;
  orderDate: string;
  shippedDate: string;
  shipAddress: Address;
  status: Status;
  reason: string;
  statusId: number | string;
}

export interface Product extends Entity {
  name: string;
  categoryId: number | string;
  numInStock: number;
  unitPrice: number;
  category: Category;
  avatar?: string;
}

export type ViewModel = Customer | Order | Product | Category  

// export type SearchFilter = {
//   equals?: TODO;
//   contains?: TODO;
//   startsWith?: TODO;
//   endsWith?: TODO;
//   lessThan?: TODO;
//   greaterThan?: TODO;
//   lessThanOrEqual?: TODO;
//   greaterThanOrEqual?: TODO;
//   between?: TODO;
//   filters?: TODO;
// };

export type SearchFilter = {
  equal?: TODO,
  contain?: TODO,
  startsWith?: TODO,
  endsWith?: TODO,
  lessThan?: TODO,
  greaterThan?: TODO,
  lessThanOrEqual?: TODO,
  greaterThanOrEqual?: TODO,
  // between?: TODO,
  filters?: TODO

}

export class CustomerModel implements Customer {
  constructor(
    firstname: string = "",
    lastname: string = "",
    email: string = "",
    mobile: string = "",
    rewards: number = 0,
    membership: boolean = false,
    avatar?: string,
    files?: File[],
    origin: string = "",
    activitysector: string = "",
    activitysetup: string = "",
    type: string = "",
    project: string = "",
    physicallocation: string = "",
    sex: string = "",
    status: string = "",
    age?: number,
    firstcontact: string = "",
    internalfollowup: string = "",
    contactdate?: Date,
    ackdate?: Date,
    ackindicator: string = "",
  ) {
    this.id = 0;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.mobile = mobile;
    this.membership = membership;
    this.rewards = rewards;
    this.orderAmount = 0;
    this.avatar = avatar;
    this.files = files;
    this.origin = origin;
    this.activitysector = activitysector;
    this.activitysetup = activitysetup;
    this.type = type;
    this.project = project;
    this.physicallocation = physicallocation;
    this.sex = sex;
    this.status = status;
    this.age = age;
    this.firstcontact = firstcontact;
    this.internalfollowup = internalfollowup;
    this.contactdate = contactdate;
    this.ackdate = ackdate;
    this.ackindicator = ackindicator;
  }
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mobile: string;

  membership: boolean;
  rewards: number;
  orders?: string[];
  orderAmount: number;

  files?: File[];

  origin: string;
  activitysector: string;
  activitysetup: string;
  type: string;
  project: string;
  physicallocation: string;
  sex: string;
  status: string;
  age?: number;
  firstcontact: string;
  internalfollowup: string;
  contactdate?: Date;
  ackdate?: Date;
  ackindicator: string;  
}

export class OrderModel implements Order {
  constructor(
    reference: string = "",
    customerId: number = 0,
    customer = {} as Customer,
    customerName: string = "",
    products: Product[] = [],
    amount: number = 0,
    quantity: number = 0,
    statusId: number | string = 1,
    status: Status = {id: 1, name: "En cours"},
    reason: string = "",
    orderDate?: string,
    shippedDate?: string,
    shipAddress?: Address,
  ) {
    this.id = 0;
    this.reference = reference;
    this.customerId = customerId;
    this.customer = customer;
    this.customerName = customerName;
    this.amount = amount;
    this.quantity = quantity;
    this.orderDate = orderDate;
    this.shippedDate = shippedDate;
    this.shipAddress = shipAddress;
    this.status = status;
    this.reason = reason;
    this.statusId = statusId;
  }
  id: number;
  reference: string;
  customerId: number;
  customer: Customer;
  customerName: string;
  products: Product[];
  amount: number;
  quantity: number;
  orderDate: string;
  shippedDate: string;
  shipAddress: Address;
  status: Status;
  reason: string;
  statusId: number | string;
}

export class ProductModel implements Product {
  constructor(
    name: string = "",
    categoryId =  "" as string,
    numInStock: number = 0,
    unitPrice: number = 0,
    category = {} as Category,
  ) {
    this.id = 0;
    this.name = name;
    this.categoryId = categoryId;
    this.numInStock = numInStock;
    this.unitPrice = unitPrice;
    this.category = category;
  
  }
  id: number;
  name: string;
  categoryId: number | string;
  numInStock: number;
  unitPrice: number;
  category: Category;

}
