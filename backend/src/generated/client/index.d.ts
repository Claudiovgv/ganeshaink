
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model EmployeeService
 * 
 */
export type EmployeeService = $Result.DefaultSelection<Prisma.$EmployeeServicePayload>
/**
 * Model WorkSchedule
 * 
 */
export type WorkSchedule = $Result.DefaultSelection<Prisma.$WorkSchedulePayload>
/**
 * Model TimeBlock
 * 
 */
export type TimeBlock = $Result.DefaultSelection<Prisma.$TimeBlockPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model ConsultationRequest
 * 
 */
export type ConsultationRequest = $Result.DefaultSelection<Prisma.$ConsultationRequestPayload>
/**
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  employee: 'employee'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ServiceCategory: {
  barbershop: 'barbershop',
  tattoo: 'tattoo',
  piercing: 'piercing',
  nails: 'nails'
};

export type ServiceCategory = (typeof ServiceCategory)[keyof typeof ServiceCategory]


export const TimeBlockType: {
  vacation: 'vacation',
  break: 'break',
  custom: 'custom'
};

export type TimeBlockType = (typeof TimeBlockType)[keyof typeof TimeBlockType]


export const AppointmentStatus: {
  pending: 'pending',
  confirmed: 'confirmed',
  cancelled: 'cancelled',
  completed: 'completed'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const ConsultationStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  scheduled: 'scheduled'
};

export type ConsultationStatus = (typeof ConsultationStatus)[keyof typeof ConsultationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ServiceCategory = $Enums.ServiceCategory

export const ServiceCategory: typeof $Enums.ServiceCategory

export type TimeBlockType = $Enums.TimeBlockType

export const TimeBlockType: typeof $Enums.TimeBlockType

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type ConsultationStatus = $Enums.ConsultationStatus

export const ConsultationStatus: typeof $Enums.ConsultationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.employeeService`: Exposes CRUD operations for the **EmployeeService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeServices
    * const employeeServices = await prisma.employeeService.findMany()
    * ```
    */
  get employeeService(): Prisma.EmployeeServiceDelegate<ExtArgs>;

  /**
   * `prisma.workSchedule`: Exposes CRUD operations for the **WorkSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkSchedules
    * const workSchedules = await prisma.workSchedule.findMany()
    * ```
    */
  get workSchedule(): Prisma.WorkScheduleDelegate<ExtArgs>;

  /**
   * `prisma.timeBlock`: Exposes CRUD operations for the **TimeBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeBlocks
    * const timeBlocks = await prisma.timeBlock.findMany()
    * ```
    */
  get timeBlock(): Prisma.TimeBlockDelegate<ExtArgs>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs>;

  /**
   * `prisma.consultationRequest`: Exposes CRUD operations for the **ConsultationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConsultationRequests
    * const consultationRequests = await prisma.consultationRequest.findMany()
    * ```
    */
  get consultationRequest(): Prisma.ConsultationRequestDelegate<ExtArgs>;

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Employee: 'Employee',
    Service: 'Service',
    EmployeeService: 'EmployeeService',
    WorkSchedule: 'WorkSchedule',
    TimeBlock: 'TimeBlock',
    Appointment: 'Appointment',
    ConsultationRequest: 'ConsultationRequest',
    BlogPost: 'BlogPost'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "employee" | "service" | "employeeService" | "workSchedule" | "timeBlock" | "appointment" | "consultationRequest" | "blogPost"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      EmployeeService: {
        payload: Prisma.$EmployeeServicePayload<ExtArgs>
        fields: Prisma.EmployeeServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          findFirst: {
            args: Prisma.EmployeeServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          findMany: {
            args: Prisma.EmployeeServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>[]
          }
          create: {
            args: Prisma.EmployeeServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          createMany: {
            args: Prisma.EmployeeServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployeeServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          update: {
            args: Prisma.EmployeeServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          aggregate: {
            args: Prisma.EmployeeServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeService>
          }
          groupBy: {
            args: Prisma.EmployeeServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeServiceCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeServiceCountAggregateOutputType> | number
          }
        }
      }
      WorkSchedule: {
        payload: Prisma.$WorkSchedulePayload<ExtArgs>
        fields: Prisma.WorkScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          findFirst: {
            args: Prisma.WorkScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          findMany: {
            args: Prisma.WorkScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>[]
          }
          create: {
            args: Prisma.WorkScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          createMany: {
            args: Prisma.WorkScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WorkScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          update: {
            args: Prisma.WorkScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          deleteMany: {
            args: Prisma.WorkScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSchedulePayload>
          }
          aggregate: {
            args: Prisma.WorkScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkSchedule>
          }
          groupBy: {
            args: Prisma.WorkScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<WorkScheduleCountAggregateOutputType> | number
          }
        }
      }
      TimeBlock: {
        payload: Prisma.$TimeBlockPayload<ExtArgs>
        fields: Prisma.TimeBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          findFirst: {
            args: Prisma.TimeBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          findMany: {
            args: Prisma.TimeBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>[]
          }
          create: {
            args: Prisma.TimeBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          createMany: {
            args: Prisma.TimeBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TimeBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          update: {
            args: Prisma.TimeBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          deleteMany: {
            args: Prisma.TimeBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimeBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeBlockPayload>
          }
          aggregate: {
            args: Prisma.TimeBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeBlock>
          }
          groupBy: {
            args: Prisma.TimeBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeBlockCountArgs<ExtArgs>
            result: $Utils.Optional<TimeBlockCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      ConsultationRequest: {
        payload: Prisma.$ConsultationRequestPayload<ExtArgs>
        fields: Prisma.ConsultationRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          findFirst: {
            args: Prisma.ConsultationRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          findMany: {
            args: Prisma.ConsultationRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>[]
          }
          create: {
            args: Prisma.ConsultationRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          createMany: {
            args: Prisma.ConsultationRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConsultationRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          update: {
            args: Prisma.ConsultationRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConsultationRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationRequestPayload>
          }
          aggregate: {
            args: Prisma.ConsultationRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultationRequest>
          }
          groupBy: {
            args: Prisma.ConsultationRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationRequestCountAggregateOutputType> | number
          }
        }
      }
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    blogPosts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blogPosts?: boolean | UserCountOutputTypeCountBlogPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlogPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    services: number
    workSchedules: number
    timeBlocks: number
    appointments: number
    consultations: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | EmployeeCountOutputTypeCountServicesArgs
    workSchedules?: boolean | EmployeeCountOutputTypeCountWorkSchedulesArgs
    timeBlocks?: boolean | EmployeeCountOutputTypeCountTimeBlocksArgs
    appointments?: boolean | EmployeeCountOutputTypeCountAppointmentsArgs
    consultations?: boolean | EmployeeCountOutputTypeCountConsultationsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountWorkSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkScheduleWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountTimeBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeBlockWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationRequestWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    employees: number
    appointments: number
    consultations: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | ServiceCountOutputTypeCountEmployeesArgs
    appointments?: boolean | ServiceCountOutputTypeCountAppointmentsArgs
    consultations?: boolean | ServiceCountOutputTypeCountConsultationsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountConsultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    employee?: boolean | User$employeeArgs<ExtArgs>
    blogPosts?: boolean | User$blogPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | User$employeeArgs<ExtArgs>
    blogPosts?: boolean | User$blogPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs> | null
      blogPosts: Prisma.$BlogPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends User$employeeArgs<ExtArgs> = {}>(args?: Subset<T, User$employeeArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    blogPosts<T extends User$blogPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$blogPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.employee
   */
  export type User$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * User.blogPosts
   */
  export type User$blogPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    cursor?: BlogPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type EmployeeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    bio: string | null
    photoUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    bio: string | null
    photoUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    bio: number
    photoUrl: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type EmployeeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type EmployeeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type EmployeeMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    bio?: true
    photoUrl?: true
    isActive?: true
    createdAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    bio?: true
    photoUrl?: true
    isActive?: true
    createdAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    bio?: true
    photoUrl?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _avg?: EmployeeAvgAggregateInputType
    _sum?: EmployeeSumAggregateInputType
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: number
    userId: number
    name: string
    bio: string | null
    photoUrl: string | null
    isActive: boolean
    createdAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _avg: EmployeeAvgAggregateOutputType | null
    _sum: EmployeeSumAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    bio?: boolean
    photoUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | Employee$servicesArgs<ExtArgs>
    workSchedules?: boolean | Employee$workSchedulesArgs<ExtArgs>
    timeBlocks?: boolean | Employee$timeBlocksArgs<ExtArgs>
    appointments?: boolean | Employee$appointmentsArgs<ExtArgs>
    consultations?: boolean | Employee$consultationsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>


  export type EmployeeSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    bio?: boolean
    photoUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | Employee$servicesArgs<ExtArgs>
    workSchedules?: boolean | Employee$workSchedulesArgs<ExtArgs>
    timeBlocks?: boolean | Employee$timeBlocksArgs<ExtArgs>
    appointments?: boolean | Employee$appointmentsArgs<ExtArgs>
    consultations?: boolean | Employee$consultationsArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      services: Prisma.$EmployeeServicePayload<ExtArgs>[]
      workSchedules: Prisma.$WorkSchedulePayload<ExtArgs>[]
      timeBlocks: Prisma.$TimeBlockPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      consultations: Prisma.$ConsultationRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      name: string
      bio: string | null
      photoUrl: string | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    services<T extends Employee$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany"> | Null>
    workSchedules<T extends Employee$workSchedulesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$workSchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findMany"> | Null>
    timeBlocks<T extends Employee$timeBlocksArgs<ExtArgs> = {}>(args?: Subset<T, Employee$timeBlocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findMany"> | Null>
    appointments<T extends Employee$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    consultations<T extends Employee$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */ 
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'Int'>
    readonly userId: FieldRef<"Employee", 'Int'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly bio: FieldRef<"Employee", 'String'>
    readonly photoUrl: FieldRef<"Employee", 'String'>
    readonly isActive: FieldRef<"Employee", 'Boolean'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee.services
   */
  export type Employee$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    cursor?: EmployeeServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * Employee.workSchedules
   */
  export type Employee$workSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    where?: WorkScheduleWhereInput
    orderBy?: WorkScheduleOrderByWithRelationInput | WorkScheduleOrderByWithRelationInput[]
    cursor?: WorkScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkScheduleScalarFieldEnum | WorkScheduleScalarFieldEnum[]
  }

  /**
   * Employee.timeBlocks
   */
  export type Employee$timeBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    where?: TimeBlockWhereInput
    orderBy?: TimeBlockOrderByWithRelationInput | TimeBlockOrderByWithRelationInput[]
    cursor?: TimeBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeBlockScalarFieldEnum | TimeBlockScalarFieldEnum[]
  }

  /**
   * Employee.appointments
   */
  export type Employee$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Employee.consultations
   */
  export type Employee$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    where?: ConsultationRequestWhereInput
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    cursor?: ConsultationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationRequestScalarFieldEnum | ConsultationRequestScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
    durationMin: number | null
    price: Decimal | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
    durationMin: number | null
    price: Decimal | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    category: $Enums.ServiceCategory | null
    description: string | null
    durationMin: number | null
    price: Decimal | null
    requiresConsultation: boolean | null
    isActive: boolean | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category: $Enums.ServiceCategory | null
    description: string | null
    durationMin: number | null
    price: Decimal | null
    requiresConsultation: boolean | null
    isActive: boolean | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    category: number
    description: number
    durationMin: number
    price: number
    requiresConsultation: number
    isActive: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
    durationMin?: true
    price?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
    durationMin?: true
    price?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    durationMin?: true
    price?: true
    requiresConsultation?: true
    isActive?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    durationMin?: true
    price?: true
    requiresConsultation?: true
    isActive?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    description?: true
    durationMin?: true
    price?: true
    requiresConsultation?: true
    isActive?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: number
    name: string
    category: $Enums.ServiceCategory
    description: string | null
    durationMin: number
    price: Decimal
    requiresConsultation: boolean
    isActive: boolean
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    durationMin?: boolean
    price?: boolean
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: boolean | Service$employeesArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    consultations?: boolean | Service$consultationsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>


  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    durationMin?: boolean
    price?: boolean
    requiresConsultation?: boolean
    isActive?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Service$employeesArgs<ExtArgs>
    appointments?: boolean | Service$appointmentsArgs<ExtArgs>
    consultations?: boolean | Service$consultationsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      employees: Prisma.$EmployeeServicePayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      consultations: Prisma.$ConsultationRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category: $Enums.ServiceCategory
      description: string | null
      durationMin: number
      price: Prisma.Decimal
      requiresConsultation: boolean
      isActive: boolean
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Service$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Service$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany"> | Null>
    appointments<T extends Service$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Service$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    consultations<T extends Service$consultationsArgs<ExtArgs> = {}>(args?: Subset<T, Service$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'Int'>
    readonly name: FieldRef<"Service", 'String'>
    readonly category: FieldRef<"Service", 'ServiceCategory'>
    readonly description: FieldRef<"Service", 'String'>
    readonly durationMin: FieldRef<"Service", 'Int'>
    readonly price: FieldRef<"Service", 'Decimal'>
    readonly requiresConsultation: FieldRef<"Service", 'Boolean'>
    readonly isActive: FieldRef<"Service", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }

  /**
   * Service.employees
   */
  export type Service$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    cursor?: EmployeeServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * Service.appointments
   */
  export type Service$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Service.consultations
   */
  export type Service$consultationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    where?: ConsultationRequestWhereInput
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    cursor?: ConsultationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationRequestScalarFieldEnum | ConsultationRequestScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeService
   */

  export type AggregateEmployeeService = {
    _count: EmployeeServiceCountAggregateOutputType | null
    _avg: EmployeeServiceAvgAggregateOutputType | null
    _sum: EmployeeServiceSumAggregateOutputType | null
    _min: EmployeeServiceMinAggregateOutputType | null
    _max: EmployeeServiceMaxAggregateOutputType | null
  }

  export type EmployeeServiceAvgAggregateOutputType = {
    employeeId: number | null
    serviceId: number | null
  }

  export type EmployeeServiceSumAggregateOutputType = {
    employeeId: number | null
    serviceId: number | null
  }

  export type EmployeeServiceMinAggregateOutputType = {
    employeeId: number | null
    serviceId: number | null
  }

  export type EmployeeServiceMaxAggregateOutputType = {
    employeeId: number | null
    serviceId: number | null
  }

  export type EmployeeServiceCountAggregateOutputType = {
    employeeId: number
    serviceId: number
    _all: number
  }


  export type EmployeeServiceAvgAggregateInputType = {
    employeeId?: true
    serviceId?: true
  }

  export type EmployeeServiceSumAggregateInputType = {
    employeeId?: true
    serviceId?: true
  }

  export type EmployeeServiceMinAggregateInputType = {
    employeeId?: true
    serviceId?: true
  }

  export type EmployeeServiceMaxAggregateInputType = {
    employeeId?: true
    serviceId?: true
  }

  export type EmployeeServiceCountAggregateInputType = {
    employeeId?: true
    serviceId?: true
    _all?: true
  }

  export type EmployeeServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeService to aggregate.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeServices
    **/
    _count?: true | EmployeeServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeServiceMaxAggregateInputType
  }

  export type GetEmployeeServiceAggregateType<T extends EmployeeServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeService[P]>
      : GetScalarType<T[P], AggregateEmployeeService[P]>
  }




  export type EmployeeServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithAggregationInput | EmployeeServiceOrderByWithAggregationInput[]
    by: EmployeeServiceScalarFieldEnum[] | EmployeeServiceScalarFieldEnum
    having?: EmployeeServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeServiceCountAggregateInputType | true
    _avg?: EmployeeServiceAvgAggregateInputType
    _sum?: EmployeeServiceSumAggregateInputType
    _min?: EmployeeServiceMinAggregateInputType
    _max?: EmployeeServiceMaxAggregateInputType
  }

  export type EmployeeServiceGroupByOutputType = {
    employeeId: number
    serviceId: number
    _count: EmployeeServiceCountAggregateOutputType | null
    _avg: EmployeeServiceAvgAggregateOutputType | null
    _sum: EmployeeServiceSumAggregateOutputType | null
    _min: EmployeeServiceMinAggregateOutputType | null
    _max: EmployeeServiceMaxAggregateOutputType | null
  }

  type GetEmployeeServiceGroupByPayload<T extends EmployeeServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeServiceGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeServiceGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    employeeId?: boolean
    serviceId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeService"]>


  export type EmployeeServiceSelectScalar = {
    employeeId?: boolean
    serviceId?: boolean
  }

  export type EmployeeServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $EmployeeServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeService"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      employeeId: number
      serviceId: number
    }, ExtArgs["result"]["employeeService"]>
    composites: {}
  }

  type EmployeeServiceGetPayload<S extends boolean | null | undefined | EmployeeServiceDefaultArgs> = $Result.GetResult<Prisma.$EmployeeServicePayload, S>

  type EmployeeServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeServiceCountAggregateInputType | true
    }

  export interface EmployeeServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeService'], meta: { name: 'EmployeeService' } }
    /**
     * Find zero or one EmployeeService that matches the filter.
     * @param {EmployeeServiceFindUniqueArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeServiceFindUniqueArgs>(args: SelectSubset<T, EmployeeServiceFindUniqueArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EmployeeService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmployeeServiceFindUniqueOrThrowArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EmployeeService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindFirstArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeServiceFindFirstArgs>(args?: SelectSubset<T, EmployeeServiceFindFirstArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EmployeeService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindFirstOrThrowArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EmployeeServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeServices
     * const employeeServices = await prisma.employeeService.findMany()
     * 
     * // Get first 10 EmployeeServices
     * const employeeServices = await prisma.employeeService.findMany({ take: 10 })
     * 
     * // Only select the `employeeId`
     * const employeeServiceWithEmployeeIdOnly = await prisma.employeeService.findMany({ select: { employeeId: true } })
     * 
     */
    findMany<T extends EmployeeServiceFindManyArgs>(args?: SelectSubset<T, EmployeeServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EmployeeService.
     * @param {EmployeeServiceCreateArgs} args - Arguments to create a EmployeeService.
     * @example
     * // Create one EmployeeService
     * const EmployeeService = await prisma.employeeService.create({
     *   data: {
     *     // ... data to create a EmployeeService
     *   }
     * })
     * 
     */
    create<T extends EmployeeServiceCreateArgs>(args: SelectSubset<T, EmployeeServiceCreateArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EmployeeServices.
     * @param {EmployeeServiceCreateManyArgs} args - Arguments to create many EmployeeServices.
     * @example
     * // Create many EmployeeServices
     * const employeeService = await prisma.employeeService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeServiceCreateManyArgs>(args?: SelectSubset<T, EmployeeServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmployeeService.
     * @param {EmployeeServiceDeleteArgs} args - Arguments to delete one EmployeeService.
     * @example
     * // Delete one EmployeeService
     * const EmployeeService = await prisma.employeeService.delete({
     *   where: {
     *     // ... filter to delete one EmployeeService
     *   }
     * })
     * 
     */
    delete<T extends EmployeeServiceDeleteArgs>(args: SelectSubset<T, EmployeeServiceDeleteArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EmployeeService.
     * @param {EmployeeServiceUpdateArgs} args - Arguments to update one EmployeeService.
     * @example
     * // Update one EmployeeService
     * const employeeService = await prisma.employeeService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeServiceUpdateArgs>(args: SelectSubset<T, EmployeeServiceUpdateArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EmployeeServices.
     * @param {EmployeeServiceDeleteManyArgs} args - Arguments to filter EmployeeServices to delete.
     * @example
     * // Delete a few EmployeeServices
     * const { count } = await prisma.employeeService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeServiceDeleteManyArgs>(args?: SelectSubset<T, EmployeeServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeServices
     * const employeeService = await prisma.employeeService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeServiceUpdateManyArgs>(args: SelectSubset<T, EmployeeServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeService.
     * @param {EmployeeServiceUpsertArgs} args - Arguments to update or create a EmployeeService.
     * @example
     * // Update or create a EmployeeService
     * const employeeService = await prisma.employeeService.upsert({
     *   create: {
     *     // ... data to create a EmployeeService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeService we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeServiceUpsertArgs>(args: SelectSubset<T, EmployeeServiceUpsertArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EmployeeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceCountArgs} args - Arguments to filter EmployeeServices to count.
     * @example
     * // Count the number of EmployeeServices
     * const count = await prisma.employeeService.count({
     *   where: {
     *     // ... the filter for the EmployeeServices we want to count
     *   }
     * })
    **/
    count<T extends EmployeeServiceCountArgs>(
      args?: Subset<T, EmployeeServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeServiceAggregateArgs>(args: Subset<T, EmployeeServiceAggregateArgs>): Prisma.PrismaPromise<GetEmployeeServiceAggregateType<T>>

    /**
     * Group by EmployeeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeServiceGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeService model
   */
  readonly fields: EmployeeServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeService model
   */ 
  interface EmployeeServiceFieldRefs {
    readonly employeeId: FieldRef<"EmployeeService", 'Int'>
    readonly serviceId: FieldRef<"EmployeeService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeService findUnique
   */
  export type EmployeeServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService findUniqueOrThrow
   */
  export type EmployeeServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService findFirst
   */
  export type EmployeeServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeServices.
     */
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService findFirstOrThrow
   */
  export type EmployeeServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeServices.
     */
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService findMany
   */
  export type EmployeeServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeServices to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService create
   */
  export type EmployeeServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeService.
     */
    data: XOR<EmployeeServiceCreateInput, EmployeeServiceUncheckedCreateInput>
  }

  /**
   * EmployeeService createMany
   */
  export type EmployeeServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeServices.
     */
    data: EmployeeServiceCreateManyInput | EmployeeServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeService update
   */
  export type EmployeeServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeService.
     */
    data: XOR<EmployeeServiceUpdateInput, EmployeeServiceUncheckedUpdateInput>
    /**
     * Choose, which EmployeeService to update.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService updateMany
   */
  export type EmployeeServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeServices.
     */
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeServices to update
     */
    where?: EmployeeServiceWhereInput
  }

  /**
   * EmployeeService upsert
   */
  export type EmployeeServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeService to update in case it exists.
     */
    where: EmployeeServiceWhereUniqueInput
    /**
     * In case the EmployeeService found by the `where` argument doesn't exist, create a new EmployeeService with this data.
     */
    create: XOR<EmployeeServiceCreateInput, EmployeeServiceUncheckedCreateInput>
    /**
     * In case the EmployeeService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeServiceUpdateInput, EmployeeServiceUncheckedUpdateInput>
  }

  /**
   * EmployeeService delete
   */
  export type EmployeeServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter which EmployeeService to delete.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService deleteMany
   */
  export type EmployeeServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeServices to delete
     */
    where?: EmployeeServiceWhereInput
  }

  /**
   * EmployeeService without action
   */
  export type EmployeeServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
  }


  /**
   * Model WorkSchedule
   */

  export type AggregateWorkSchedule = {
    _count: WorkScheduleCountAggregateOutputType | null
    _avg: WorkScheduleAvgAggregateOutputType | null
    _sum: WorkScheduleSumAggregateOutputType | null
    _min: WorkScheduleMinAggregateOutputType | null
    _max: WorkScheduleMaxAggregateOutputType | null
  }

  export type WorkScheduleAvgAggregateOutputType = {
    id: number | null
    employeeId: number | null
    dayOfWeek: number | null
  }

  export type WorkScheduleSumAggregateOutputType = {
    id: number | null
    employeeId: number | null
    dayOfWeek: number | null
  }

  export type WorkScheduleMinAggregateOutputType = {
    id: number | null
    employeeId: number | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    isActive: boolean | null
  }

  export type WorkScheduleMaxAggregateOutputType = {
    id: number | null
    employeeId: number | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    isActive: boolean | null
  }

  export type WorkScheduleCountAggregateOutputType = {
    id: number
    employeeId: number
    dayOfWeek: number
    startTime: number
    endTime: number
    isActive: number
    _all: number
  }


  export type WorkScheduleAvgAggregateInputType = {
    id?: true
    employeeId?: true
    dayOfWeek?: true
  }

  export type WorkScheduleSumAggregateInputType = {
    id?: true
    employeeId?: true
    dayOfWeek?: true
  }

  export type WorkScheduleMinAggregateInputType = {
    id?: true
    employeeId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    isActive?: true
  }

  export type WorkScheduleMaxAggregateInputType = {
    id?: true
    employeeId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    isActive?: true
  }

  export type WorkScheduleCountAggregateInputType = {
    id?: true
    employeeId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    isActive?: true
    _all?: true
  }

  export type WorkScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkSchedule to aggregate.
     */
    where?: WorkScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSchedules to fetch.
     */
    orderBy?: WorkScheduleOrderByWithRelationInput | WorkScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkSchedules
    **/
    _count?: true | WorkScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkScheduleMaxAggregateInputType
  }

  export type GetWorkScheduleAggregateType<T extends WorkScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkSchedule[P]>
      : GetScalarType<T[P], AggregateWorkSchedule[P]>
  }




  export type WorkScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkScheduleWhereInput
    orderBy?: WorkScheduleOrderByWithAggregationInput | WorkScheduleOrderByWithAggregationInput[]
    by: WorkScheduleScalarFieldEnum[] | WorkScheduleScalarFieldEnum
    having?: WorkScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkScheduleCountAggregateInputType | true
    _avg?: WorkScheduleAvgAggregateInputType
    _sum?: WorkScheduleSumAggregateInputType
    _min?: WorkScheduleMinAggregateInputType
    _max?: WorkScheduleMaxAggregateInputType
  }

  export type WorkScheduleGroupByOutputType = {
    id: number
    employeeId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive: boolean
    _count: WorkScheduleCountAggregateOutputType | null
    _avg: WorkScheduleAvgAggregateOutputType | null
    _sum: WorkScheduleSumAggregateOutputType | null
    _min: WorkScheduleMinAggregateOutputType | null
    _max: WorkScheduleMaxAggregateOutputType | null
  }

  type GetWorkScheduleGroupByPayload<T extends WorkScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], WorkScheduleGroupByOutputType[P]>
        }
      >
    >


  export type WorkScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    isActive?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workSchedule"]>


  export type WorkScheduleSelectScalar = {
    id?: boolean
    employeeId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    isActive?: boolean
  }

  export type WorkScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $WorkSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkSchedule"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeId: number
      dayOfWeek: number
      startTime: string
      endTime: string
      isActive: boolean
    }, ExtArgs["result"]["workSchedule"]>
    composites: {}
  }

  type WorkScheduleGetPayload<S extends boolean | null | undefined | WorkScheduleDefaultArgs> = $Result.GetResult<Prisma.$WorkSchedulePayload, S>

  type WorkScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkScheduleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkScheduleCountAggregateInputType | true
    }

  export interface WorkScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkSchedule'], meta: { name: 'WorkSchedule' } }
    /**
     * Find zero or one WorkSchedule that matches the filter.
     * @param {WorkScheduleFindUniqueArgs} args - Arguments to find a WorkSchedule
     * @example
     * // Get one WorkSchedule
     * const workSchedule = await prisma.workSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkScheduleFindUniqueArgs>(args: SelectSubset<T, WorkScheduleFindUniqueArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkSchedule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkScheduleFindUniqueOrThrowArgs} args - Arguments to find a WorkSchedule
     * @example
     * // Get one WorkSchedule
     * const workSchedule = await prisma.workSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleFindFirstArgs} args - Arguments to find a WorkSchedule
     * @example
     * // Get one WorkSchedule
     * const workSchedule = await prisma.workSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkScheduleFindFirstArgs>(args?: SelectSubset<T, WorkScheduleFindFirstArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleFindFirstOrThrowArgs} args - Arguments to find a WorkSchedule
     * @example
     * // Get one WorkSchedule
     * const workSchedule = await prisma.workSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkSchedules
     * const workSchedules = await prisma.workSchedule.findMany()
     * 
     * // Get first 10 WorkSchedules
     * const workSchedules = await prisma.workSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workScheduleWithIdOnly = await prisma.workSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkScheduleFindManyArgs>(args?: SelectSubset<T, WorkScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkSchedule.
     * @param {WorkScheduleCreateArgs} args - Arguments to create a WorkSchedule.
     * @example
     * // Create one WorkSchedule
     * const WorkSchedule = await prisma.workSchedule.create({
     *   data: {
     *     // ... data to create a WorkSchedule
     *   }
     * })
     * 
     */
    create<T extends WorkScheduleCreateArgs>(args: SelectSubset<T, WorkScheduleCreateArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkSchedules.
     * @param {WorkScheduleCreateManyArgs} args - Arguments to create many WorkSchedules.
     * @example
     * // Create many WorkSchedules
     * const workSchedule = await prisma.workSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkScheduleCreateManyArgs>(args?: SelectSubset<T, WorkScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkSchedule.
     * @param {WorkScheduleDeleteArgs} args - Arguments to delete one WorkSchedule.
     * @example
     * // Delete one WorkSchedule
     * const WorkSchedule = await prisma.workSchedule.delete({
     *   where: {
     *     // ... filter to delete one WorkSchedule
     *   }
     * })
     * 
     */
    delete<T extends WorkScheduleDeleteArgs>(args: SelectSubset<T, WorkScheduleDeleteArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkSchedule.
     * @param {WorkScheduleUpdateArgs} args - Arguments to update one WorkSchedule.
     * @example
     * // Update one WorkSchedule
     * const workSchedule = await prisma.workSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkScheduleUpdateArgs>(args: SelectSubset<T, WorkScheduleUpdateArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkSchedules.
     * @param {WorkScheduleDeleteManyArgs} args - Arguments to filter WorkSchedules to delete.
     * @example
     * // Delete a few WorkSchedules
     * const { count } = await prisma.workSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkScheduleDeleteManyArgs>(args?: SelectSubset<T, WorkScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkSchedules
     * const workSchedule = await prisma.workSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkScheduleUpdateManyArgs>(args: SelectSubset<T, WorkScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkSchedule.
     * @param {WorkScheduleUpsertArgs} args - Arguments to update or create a WorkSchedule.
     * @example
     * // Update or create a WorkSchedule
     * const workSchedule = await prisma.workSchedule.upsert({
     *   create: {
     *     // ... data to create a WorkSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkSchedule we want to update
     *   }
     * })
     */
    upsert<T extends WorkScheduleUpsertArgs>(args: SelectSubset<T, WorkScheduleUpsertArgs<ExtArgs>>): Prisma__WorkScheduleClient<$Result.GetResult<Prisma.$WorkSchedulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleCountArgs} args - Arguments to filter WorkSchedules to count.
     * @example
     * // Count the number of WorkSchedules
     * const count = await prisma.workSchedule.count({
     *   where: {
     *     // ... the filter for the WorkSchedules we want to count
     *   }
     * })
    **/
    count<T extends WorkScheduleCountArgs>(
      args?: Subset<T, WorkScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkScheduleAggregateArgs>(args: Subset<T, WorkScheduleAggregateArgs>): Prisma.PrismaPromise<GetWorkScheduleAggregateType<T>>

    /**
     * Group by WorkSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkScheduleGroupByArgs['orderBy'] }
        : { orderBy?: WorkScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkSchedule model
   */
  readonly fields: WorkScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkSchedule model
   */ 
  interface WorkScheduleFieldRefs {
    readonly id: FieldRef<"WorkSchedule", 'Int'>
    readonly employeeId: FieldRef<"WorkSchedule", 'Int'>
    readonly dayOfWeek: FieldRef<"WorkSchedule", 'Int'>
    readonly startTime: FieldRef<"WorkSchedule", 'String'>
    readonly endTime: FieldRef<"WorkSchedule", 'String'>
    readonly isActive: FieldRef<"WorkSchedule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * WorkSchedule findUnique
   */
  export type WorkScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WorkSchedule to fetch.
     */
    where: WorkScheduleWhereUniqueInput
  }

  /**
   * WorkSchedule findUniqueOrThrow
   */
  export type WorkScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WorkSchedule to fetch.
     */
    where: WorkScheduleWhereUniqueInput
  }

  /**
   * WorkSchedule findFirst
   */
  export type WorkScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WorkSchedule to fetch.
     */
    where?: WorkScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSchedules to fetch.
     */
    orderBy?: WorkScheduleOrderByWithRelationInput | WorkScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkSchedules.
     */
    cursor?: WorkScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkSchedules.
     */
    distinct?: WorkScheduleScalarFieldEnum | WorkScheduleScalarFieldEnum[]
  }

  /**
   * WorkSchedule findFirstOrThrow
   */
  export type WorkScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WorkSchedule to fetch.
     */
    where?: WorkScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSchedules to fetch.
     */
    orderBy?: WorkScheduleOrderByWithRelationInput | WorkScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkSchedules.
     */
    cursor?: WorkScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkSchedules.
     */
    distinct?: WorkScheduleScalarFieldEnum | WorkScheduleScalarFieldEnum[]
  }

  /**
   * WorkSchedule findMany
   */
  export type WorkScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WorkSchedules to fetch.
     */
    where?: WorkScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSchedules to fetch.
     */
    orderBy?: WorkScheduleOrderByWithRelationInput | WorkScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkSchedules.
     */
    cursor?: WorkScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSchedules.
     */
    skip?: number
    distinct?: WorkScheduleScalarFieldEnum | WorkScheduleScalarFieldEnum[]
  }

  /**
   * WorkSchedule create
   */
  export type WorkScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkSchedule.
     */
    data: XOR<WorkScheduleCreateInput, WorkScheduleUncheckedCreateInput>
  }

  /**
   * WorkSchedule createMany
   */
  export type WorkScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkSchedules.
     */
    data: WorkScheduleCreateManyInput | WorkScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkSchedule update
   */
  export type WorkScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkSchedule.
     */
    data: XOR<WorkScheduleUpdateInput, WorkScheduleUncheckedUpdateInput>
    /**
     * Choose, which WorkSchedule to update.
     */
    where: WorkScheduleWhereUniqueInput
  }

  /**
   * WorkSchedule updateMany
   */
  export type WorkScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkSchedules.
     */
    data: XOR<WorkScheduleUpdateManyMutationInput, WorkScheduleUncheckedUpdateManyInput>
    /**
     * Filter which WorkSchedules to update
     */
    where?: WorkScheduleWhereInput
  }

  /**
   * WorkSchedule upsert
   */
  export type WorkScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkSchedule to update in case it exists.
     */
    where: WorkScheduleWhereUniqueInput
    /**
     * In case the WorkSchedule found by the `where` argument doesn't exist, create a new WorkSchedule with this data.
     */
    create: XOR<WorkScheduleCreateInput, WorkScheduleUncheckedCreateInput>
    /**
     * In case the WorkSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkScheduleUpdateInput, WorkScheduleUncheckedUpdateInput>
  }

  /**
   * WorkSchedule delete
   */
  export type WorkScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
    /**
     * Filter which WorkSchedule to delete.
     */
    where: WorkScheduleWhereUniqueInput
  }

  /**
   * WorkSchedule deleteMany
   */
  export type WorkScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkSchedules to delete
     */
    where?: WorkScheduleWhereInput
  }

  /**
   * WorkSchedule without action
   */
  export type WorkScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSchedule
     */
    select?: WorkScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkScheduleInclude<ExtArgs> | null
  }


  /**
   * Model TimeBlock
   */

  export type AggregateTimeBlock = {
    _count: TimeBlockCountAggregateOutputType | null
    _avg: TimeBlockAvgAggregateOutputType | null
    _sum: TimeBlockSumAggregateOutputType | null
    _min: TimeBlockMinAggregateOutputType | null
    _max: TimeBlockMaxAggregateOutputType | null
  }

  export type TimeBlockAvgAggregateOutputType = {
    id: number | null
    employeeId: number | null
  }

  export type TimeBlockSumAggregateOutputType = {
    id: number | null
    employeeId: number | null
  }

  export type TimeBlockMinAggregateOutputType = {
    id: number | null
    employeeId: number | null
    startDatetime: Date | null
    endDatetime: Date | null
    type: $Enums.TimeBlockType | null
    reason: string | null
    createdAt: Date | null
  }

  export type TimeBlockMaxAggregateOutputType = {
    id: number | null
    employeeId: number | null
    startDatetime: Date | null
    endDatetime: Date | null
    type: $Enums.TimeBlockType | null
    reason: string | null
    createdAt: Date | null
  }

  export type TimeBlockCountAggregateOutputType = {
    id: number
    employeeId: number
    startDatetime: number
    endDatetime: number
    type: number
    reason: number
    createdAt: number
    _all: number
  }


  export type TimeBlockAvgAggregateInputType = {
    id?: true
    employeeId?: true
  }

  export type TimeBlockSumAggregateInputType = {
    id?: true
    employeeId?: true
  }

  export type TimeBlockMinAggregateInputType = {
    id?: true
    employeeId?: true
    startDatetime?: true
    endDatetime?: true
    type?: true
    reason?: true
    createdAt?: true
  }

  export type TimeBlockMaxAggregateInputType = {
    id?: true
    employeeId?: true
    startDatetime?: true
    endDatetime?: true
    type?: true
    reason?: true
    createdAt?: true
  }

  export type TimeBlockCountAggregateInputType = {
    id?: true
    employeeId?: true
    startDatetime?: true
    endDatetime?: true
    type?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type TimeBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeBlock to aggregate.
     */
    where?: TimeBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeBlocks to fetch.
     */
    orderBy?: TimeBlockOrderByWithRelationInput | TimeBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeBlocks
    **/
    _count?: true | TimeBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeBlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeBlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeBlockMaxAggregateInputType
  }

  export type GetTimeBlockAggregateType<T extends TimeBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeBlock[P]>
      : GetScalarType<T[P], AggregateTimeBlock[P]>
  }




  export type TimeBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeBlockWhereInput
    orderBy?: TimeBlockOrderByWithAggregationInput | TimeBlockOrderByWithAggregationInput[]
    by: TimeBlockScalarFieldEnum[] | TimeBlockScalarFieldEnum
    having?: TimeBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeBlockCountAggregateInputType | true
    _avg?: TimeBlockAvgAggregateInputType
    _sum?: TimeBlockSumAggregateInputType
    _min?: TimeBlockMinAggregateInputType
    _max?: TimeBlockMaxAggregateInputType
  }

  export type TimeBlockGroupByOutputType = {
    id: number
    employeeId: number
    startDatetime: Date
    endDatetime: Date
    type: $Enums.TimeBlockType
    reason: string | null
    createdAt: Date
    _count: TimeBlockCountAggregateOutputType | null
    _avg: TimeBlockAvgAggregateOutputType | null
    _sum: TimeBlockSumAggregateOutputType | null
    _min: TimeBlockMinAggregateOutputType | null
    _max: TimeBlockMaxAggregateOutputType | null
  }

  type GetTimeBlockGroupByPayload<T extends TimeBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeBlockGroupByOutputType[P]>
            : GetScalarType<T[P], TimeBlockGroupByOutputType[P]>
        }
      >
    >


  export type TimeBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    startDatetime?: boolean
    endDatetime?: boolean
    type?: boolean
    reason?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeBlock"]>


  export type TimeBlockSelectScalar = {
    id?: boolean
    employeeId?: boolean
    startDatetime?: boolean
    endDatetime?: boolean
    type?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type TimeBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TimeBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeBlock"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeId: number
      startDatetime: Date
      endDatetime: Date
      type: $Enums.TimeBlockType
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["timeBlock"]>
    composites: {}
  }

  type TimeBlockGetPayload<S extends boolean | null | undefined | TimeBlockDefaultArgs> = $Result.GetResult<Prisma.$TimeBlockPayload, S>

  type TimeBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TimeBlockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TimeBlockCountAggregateInputType | true
    }

  export interface TimeBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeBlock'], meta: { name: 'TimeBlock' } }
    /**
     * Find zero or one TimeBlock that matches the filter.
     * @param {TimeBlockFindUniqueArgs} args - Arguments to find a TimeBlock
     * @example
     * // Get one TimeBlock
     * const timeBlock = await prisma.timeBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeBlockFindUniqueArgs>(args: SelectSubset<T, TimeBlockFindUniqueArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TimeBlock that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TimeBlockFindUniqueOrThrowArgs} args - Arguments to find a TimeBlock
     * @example
     * // Get one TimeBlock
     * const timeBlock = await prisma.timeBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TimeBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockFindFirstArgs} args - Arguments to find a TimeBlock
     * @example
     * // Get one TimeBlock
     * const timeBlock = await prisma.timeBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeBlockFindFirstArgs>(args?: SelectSubset<T, TimeBlockFindFirstArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TimeBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockFindFirstOrThrowArgs} args - Arguments to find a TimeBlock
     * @example
     * // Get one TimeBlock
     * const timeBlock = await prisma.timeBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TimeBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeBlocks
     * const timeBlocks = await prisma.timeBlock.findMany()
     * 
     * // Get first 10 TimeBlocks
     * const timeBlocks = await prisma.timeBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeBlockWithIdOnly = await prisma.timeBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeBlockFindManyArgs>(args?: SelectSubset<T, TimeBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TimeBlock.
     * @param {TimeBlockCreateArgs} args - Arguments to create a TimeBlock.
     * @example
     * // Create one TimeBlock
     * const TimeBlock = await prisma.timeBlock.create({
     *   data: {
     *     // ... data to create a TimeBlock
     *   }
     * })
     * 
     */
    create<T extends TimeBlockCreateArgs>(args: SelectSubset<T, TimeBlockCreateArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TimeBlocks.
     * @param {TimeBlockCreateManyArgs} args - Arguments to create many TimeBlocks.
     * @example
     * // Create many TimeBlocks
     * const timeBlock = await prisma.timeBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeBlockCreateManyArgs>(args?: SelectSubset<T, TimeBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TimeBlock.
     * @param {TimeBlockDeleteArgs} args - Arguments to delete one TimeBlock.
     * @example
     * // Delete one TimeBlock
     * const TimeBlock = await prisma.timeBlock.delete({
     *   where: {
     *     // ... filter to delete one TimeBlock
     *   }
     * })
     * 
     */
    delete<T extends TimeBlockDeleteArgs>(args: SelectSubset<T, TimeBlockDeleteArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TimeBlock.
     * @param {TimeBlockUpdateArgs} args - Arguments to update one TimeBlock.
     * @example
     * // Update one TimeBlock
     * const timeBlock = await prisma.timeBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeBlockUpdateArgs>(args: SelectSubset<T, TimeBlockUpdateArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TimeBlocks.
     * @param {TimeBlockDeleteManyArgs} args - Arguments to filter TimeBlocks to delete.
     * @example
     * // Delete a few TimeBlocks
     * const { count } = await prisma.timeBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeBlockDeleteManyArgs>(args?: SelectSubset<T, TimeBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeBlocks
     * const timeBlock = await prisma.timeBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeBlockUpdateManyArgs>(args: SelectSubset<T, TimeBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TimeBlock.
     * @param {TimeBlockUpsertArgs} args - Arguments to update or create a TimeBlock.
     * @example
     * // Update or create a TimeBlock
     * const timeBlock = await prisma.timeBlock.upsert({
     *   create: {
     *     // ... data to create a TimeBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeBlock we want to update
     *   }
     * })
     */
    upsert<T extends TimeBlockUpsertArgs>(args: SelectSubset<T, TimeBlockUpsertArgs<ExtArgs>>): Prisma__TimeBlockClient<$Result.GetResult<Prisma.$TimeBlockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TimeBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockCountArgs} args - Arguments to filter TimeBlocks to count.
     * @example
     * // Count the number of TimeBlocks
     * const count = await prisma.timeBlock.count({
     *   where: {
     *     // ... the filter for the TimeBlocks we want to count
     *   }
     * })
    **/
    count<T extends TimeBlockCountArgs>(
      args?: Subset<T, TimeBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeBlockAggregateArgs>(args: Subset<T, TimeBlockAggregateArgs>): Prisma.PrismaPromise<GetTimeBlockAggregateType<T>>

    /**
     * Group by TimeBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeBlockGroupByArgs['orderBy'] }
        : { orderBy?: TimeBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeBlock model
   */
  readonly fields: TimeBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeBlock model
   */ 
  interface TimeBlockFieldRefs {
    readonly id: FieldRef<"TimeBlock", 'Int'>
    readonly employeeId: FieldRef<"TimeBlock", 'Int'>
    readonly startDatetime: FieldRef<"TimeBlock", 'DateTime'>
    readonly endDatetime: FieldRef<"TimeBlock", 'DateTime'>
    readonly type: FieldRef<"TimeBlock", 'TimeBlockType'>
    readonly reason: FieldRef<"TimeBlock", 'String'>
    readonly createdAt: FieldRef<"TimeBlock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeBlock findUnique
   */
  export type TimeBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter, which TimeBlock to fetch.
     */
    where: TimeBlockWhereUniqueInput
  }

  /**
   * TimeBlock findUniqueOrThrow
   */
  export type TimeBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter, which TimeBlock to fetch.
     */
    where: TimeBlockWhereUniqueInput
  }

  /**
   * TimeBlock findFirst
   */
  export type TimeBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter, which TimeBlock to fetch.
     */
    where?: TimeBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeBlocks to fetch.
     */
    orderBy?: TimeBlockOrderByWithRelationInput | TimeBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeBlocks.
     */
    cursor?: TimeBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeBlocks.
     */
    distinct?: TimeBlockScalarFieldEnum | TimeBlockScalarFieldEnum[]
  }

  /**
   * TimeBlock findFirstOrThrow
   */
  export type TimeBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter, which TimeBlock to fetch.
     */
    where?: TimeBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeBlocks to fetch.
     */
    orderBy?: TimeBlockOrderByWithRelationInput | TimeBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeBlocks.
     */
    cursor?: TimeBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeBlocks.
     */
    distinct?: TimeBlockScalarFieldEnum | TimeBlockScalarFieldEnum[]
  }

  /**
   * TimeBlock findMany
   */
  export type TimeBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter, which TimeBlocks to fetch.
     */
    where?: TimeBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeBlocks to fetch.
     */
    orderBy?: TimeBlockOrderByWithRelationInput | TimeBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeBlocks.
     */
    cursor?: TimeBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeBlocks.
     */
    skip?: number
    distinct?: TimeBlockScalarFieldEnum | TimeBlockScalarFieldEnum[]
  }

  /**
   * TimeBlock create
   */
  export type TimeBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeBlock.
     */
    data: XOR<TimeBlockCreateInput, TimeBlockUncheckedCreateInput>
  }

  /**
   * TimeBlock createMany
   */
  export type TimeBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeBlocks.
     */
    data: TimeBlockCreateManyInput | TimeBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeBlock update
   */
  export type TimeBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeBlock.
     */
    data: XOR<TimeBlockUpdateInput, TimeBlockUncheckedUpdateInput>
    /**
     * Choose, which TimeBlock to update.
     */
    where: TimeBlockWhereUniqueInput
  }

  /**
   * TimeBlock updateMany
   */
  export type TimeBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeBlocks.
     */
    data: XOR<TimeBlockUpdateManyMutationInput, TimeBlockUncheckedUpdateManyInput>
    /**
     * Filter which TimeBlocks to update
     */
    where?: TimeBlockWhereInput
  }

  /**
   * TimeBlock upsert
   */
  export type TimeBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeBlock to update in case it exists.
     */
    where: TimeBlockWhereUniqueInput
    /**
     * In case the TimeBlock found by the `where` argument doesn't exist, create a new TimeBlock with this data.
     */
    create: XOR<TimeBlockCreateInput, TimeBlockUncheckedCreateInput>
    /**
     * In case the TimeBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeBlockUpdateInput, TimeBlockUncheckedUpdateInput>
  }

  /**
   * TimeBlock delete
   */
  export type TimeBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
    /**
     * Filter which TimeBlock to delete.
     */
    where: TimeBlockWhereUniqueInput
  }

  /**
   * TimeBlock deleteMany
   */
  export type TimeBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeBlocks to delete
     */
    where?: TimeBlockWhereInput
  }

  /**
   * TimeBlock without action
   */
  export type TimeBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeBlock
     */
    select?: TimeBlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeBlockInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
    employeeId: number | null
    serviceId: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
    employeeId: number | null
    serviceId: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    employeeId: number | null
    serviceId: number | null
    startDatetime: Date | null
    endDatetime: Date | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    cancelToken: string | null
    createdAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    employeeId: number | null
    serviceId: number | null
    startDatetime: Date | null
    endDatetime: Date | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    cancelToken: string | null
    createdAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    clientName: number
    clientEmail: number
    clientPhone: number
    employeeId: number
    serviceId: number
    startDatetime: number
    endDatetime: number
    status: number
    notes: number
    cancelToken: number
    createdAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
    employeeId?: true
    serviceId?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
    employeeId?: true
    serviceId?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    employeeId?: true
    serviceId?: true
    startDatetime?: true
    endDatetime?: true
    status?: true
    notes?: true
    cancelToken?: true
    createdAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    employeeId?: true
    serviceId?: true
    startDatetime?: true
    endDatetime?: true
    status?: true
    notes?: true
    cancelToken?: true
    createdAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    employeeId?: true
    serviceId?: true
    startDatetime?: true
    endDatetime?: true
    status?: true
    notes?: true
    cancelToken?: true
    createdAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    serviceId: number
    startDatetime: Date
    endDatetime: Date
    status: $Enums.AppointmentStatus
    notes: string | null
    cancelToken: string | null
    createdAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    employeeId?: boolean
    serviceId?: boolean
    startDatetime?: boolean
    endDatetime?: boolean
    status?: boolean
    notes?: boolean
    cancelToken?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    consultation?: boolean | Appointment$consultationArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>


  export type AppointmentSelectScalar = {
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    employeeId?: boolean
    serviceId?: boolean
    startDatetime?: boolean
    endDatetime?: boolean
    status?: boolean
    notes?: boolean
    cancelToken?: boolean
    createdAt?: boolean
  }

  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    consultation?: boolean | Appointment$consultationArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
      consultation: Prisma.$ConsultationRequestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clientName: string
      clientEmail: string
      clientPhone: string
      employeeId: number
      serviceId: number
      startDatetime: Date
      endDatetime: Date
      status: $Enums.AppointmentStatus
      notes: string | null
      cancelToken: string | null
      createdAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    consultation<T extends Appointment$consultationArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$consultationArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */ 
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly clientName: FieldRef<"Appointment", 'String'>
    readonly clientEmail: FieldRef<"Appointment", 'String'>
    readonly clientPhone: FieldRef<"Appointment", 'String'>
    readonly employeeId: FieldRef<"Appointment", 'Int'>
    readonly serviceId: FieldRef<"Appointment", 'Int'>
    readonly startDatetime: FieldRef<"Appointment", 'DateTime'>
    readonly endDatetime: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly cancelToken: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment.consultation
   */
  export type Appointment$consultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    where?: ConsultationRequestWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model ConsultationRequest
   */

  export type AggregateConsultationRequest = {
    _count: ConsultationRequestCountAggregateOutputType | null
    _avg: ConsultationRequestAvgAggregateOutputType | null
    _sum: ConsultationRequestSumAggregateOutputType | null
    _min: ConsultationRequestMinAggregateOutputType | null
    _max: ConsultationRequestMaxAggregateOutputType | null
  }

  export type ConsultationRequestAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
    employeeId: number | null
    scheduledAppointmentId: number | null
  }

  export type ConsultationRequestSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
    employeeId: number | null
    scheduledAppointmentId: number | null
  }

  export type ConsultationRequestMinAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    serviceId: number | null
    employeeId: number | null
    description: string | null
    status: $Enums.ConsultationStatus | null
    scheduledAppointmentId: number | null
    createdAt: Date | null
  }

  export type ConsultationRequestMaxAggregateOutputType = {
    id: number | null
    clientName: string | null
    clientEmail: string | null
    clientPhone: string | null
    serviceId: number | null
    employeeId: number | null
    description: string | null
    status: $Enums.ConsultationStatus | null
    scheduledAppointmentId: number | null
    createdAt: Date | null
  }

  export type ConsultationRequestCountAggregateOutputType = {
    id: number
    clientName: number
    clientEmail: number
    clientPhone: number
    serviceId: number
    employeeId: number
    description: number
    referenceImages: number
    status: number
    scheduledAppointmentId: number
    createdAt: number
    _all: number
  }


  export type ConsultationRequestAvgAggregateInputType = {
    id?: true
    serviceId?: true
    employeeId?: true
    scheduledAppointmentId?: true
  }

  export type ConsultationRequestSumAggregateInputType = {
    id?: true
    serviceId?: true
    employeeId?: true
    scheduledAppointmentId?: true
  }

  export type ConsultationRequestMinAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    serviceId?: true
    employeeId?: true
    description?: true
    status?: true
    scheduledAppointmentId?: true
    createdAt?: true
  }

  export type ConsultationRequestMaxAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    serviceId?: true
    employeeId?: true
    description?: true
    status?: true
    scheduledAppointmentId?: true
    createdAt?: true
  }

  export type ConsultationRequestCountAggregateInputType = {
    id?: true
    clientName?: true
    clientEmail?: true
    clientPhone?: true
    serviceId?: true
    employeeId?: true
    description?: true
    referenceImages?: true
    status?: true
    scheduledAppointmentId?: true
    createdAt?: true
    _all?: true
  }

  export type ConsultationRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationRequest to aggregate.
     */
    where?: ConsultationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationRequests to fetch.
     */
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConsultationRequests
    **/
    _count?: true | ConsultationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsultationRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsultationRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationRequestMaxAggregateInputType
  }

  export type GetConsultationRequestAggregateType<T extends ConsultationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultationRequest[P]>
      : GetScalarType<T[P], AggregateConsultationRequest[P]>
  }




  export type ConsultationRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationRequestWhereInput
    orderBy?: ConsultationRequestOrderByWithAggregationInput | ConsultationRequestOrderByWithAggregationInput[]
    by: ConsultationRequestScalarFieldEnum[] | ConsultationRequestScalarFieldEnum
    having?: ConsultationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationRequestCountAggregateInputType | true
    _avg?: ConsultationRequestAvgAggregateInputType
    _sum?: ConsultationRequestSumAggregateInputType
    _min?: ConsultationRequestMinAggregateInputType
    _max?: ConsultationRequestMaxAggregateInputType
  }

  export type ConsultationRequestGroupByOutputType = {
    id: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    employeeId: number | null
    description: string
    referenceImages: JsonValue | null
    status: $Enums.ConsultationStatus
    scheduledAppointmentId: number | null
    createdAt: Date
    _count: ConsultationRequestCountAggregateOutputType | null
    _avg: ConsultationRequestAvgAggregateOutputType | null
    _sum: ConsultationRequestSumAggregateOutputType | null
    _min: ConsultationRequestMinAggregateOutputType | null
    _max: ConsultationRequestMaxAggregateOutputType | null
  }

  type GetConsultationRequestGroupByPayload<T extends ConsultationRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationRequestGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    serviceId?: boolean
    employeeId?: boolean
    description?: boolean
    referenceImages?: boolean
    status?: boolean
    scheduledAppointmentId?: boolean
    createdAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    employee?: boolean | ConsultationRequest$employeeArgs<ExtArgs>
    scheduledAppointment?: boolean | ConsultationRequest$scheduledAppointmentArgs<ExtArgs>
  }, ExtArgs["result"]["consultationRequest"]>


  export type ConsultationRequestSelectScalar = {
    id?: boolean
    clientName?: boolean
    clientEmail?: boolean
    clientPhone?: boolean
    serviceId?: boolean
    employeeId?: boolean
    description?: boolean
    referenceImages?: boolean
    status?: boolean
    scheduledAppointmentId?: boolean
    createdAt?: boolean
  }

  export type ConsultationRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    employee?: boolean | ConsultationRequest$employeeArgs<ExtArgs>
    scheduledAppointment?: boolean | ConsultationRequest$scheduledAppointmentArgs<ExtArgs>
  }

  export type $ConsultationRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConsultationRequest"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      employee: Prisma.$EmployeePayload<ExtArgs> | null
      scheduledAppointment: Prisma.$AppointmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clientName: string
      clientEmail: string
      clientPhone: string
      serviceId: number
      employeeId: number | null
      description: string
      referenceImages: Prisma.JsonValue | null
      status: $Enums.ConsultationStatus
      scheduledAppointmentId: number | null
      createdAt: Date
    }, ExtArgs["result"]["consultationRequest"]>
    composites: {}
  }

  type ConsultationRequestGetPayload<S extends boolean | null | undefined | ConsultationRequestDefaultArgs> = $Result.GetResult<Prisma.$ConsultationRequestPayload, S>

  type ConsultationRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConsultationRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConsultationRequestCountAggregateInputType | true
    }

  export interface ConsultationRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConsultationRequest'], meta: { name: 'ConsultationRequest' } }
    /**
     * Find zero or one ConsultationRequest that matches the filter.
     * @param {ConsultationRequestFindUniqueArgs} args - Arguments to find a ConsultationRequest
     * @example
     * // Get one ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationRequestFindUniqueArgs>(args: SelectSubset<T, ConsultationRequestFindUniqueArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ConsultationRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConsultationRequestFindUniqueOrThrowArgs} args - Arguments to find a ConsultationRequest
     * @example
     * // Get one ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ConsultationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestFindFirstArgs} args - Arguments to find a ConsultationRequest
     * @example
     * // Get one ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationRequestFindFirstArgs>(args?: SelectSubset<T, ConsultationRequestFindFirstArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ConsultationRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestFindFirstOrThrowArgs} args - Arguments to find a ConsultationRequest
     * @example
     * // Get one ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ConsultationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConsultationRequests
     * const consultationRequests = await prisma.consultationRequest.findMany()
     * 
     * // Get first 10 ConsultationRequests
     * const consultationRequests = await prisma.consultationRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationRequestWithIdOnly = await prisma.consultationRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationRequestFindManyArgs>(args?: SelectSubset<T, ConsultationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ConsultationRequest.
     * @param {ConsultationRequestCreateArgs} args - Arguments to create a ConsultationRequest.
     * @example
     * // Create one ConsultationRequest
     * const ConsultationRequest = await prisma.consultationRequest.create({
     *   data: {
     *     // ... data to create a ConsultationRequest
     *   }
     * })
     * 
     */
    create<T extends ConsultationRequestCreateArgs>(args: SelectSubset<T, ConsultationRequestCreateArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ConsultationRequests.
     * @param {ConsultationRequestCreateManyArgs} args - Arguments to create many ConsultationRequests.
     * @example
     * // Create many ConsultationRequests
     * const consultationRequest = await prisma.consultationRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationRequestCreateManyArgs>(args?: SelectSubset<T, ConsultationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ConsultationRequest.
     * @param {ConsultationRequestDeleteArgs} args - Arguments to delete one ConsultationRequest.
     * @example
     * // Delete one ConsultationRequest
     * const ConsultationRequest = await prisma.consultationRequest.delete({
     *   where: {
     *     // ... filter to delete one ConsultationRequest
     *   }
     * })
     * 
     */
    delete<T extends ConsultationRequestDeleteArgs>(args: SelectSubset<T, ConsultationRequestDeleteArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ConsultationRequest.
     * @param {ConsultationRequestUpdateArgs} args - Arguments to update one ConsultationRequest.
     * @example
     * // Update one ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationRequestUpdateArgs>(args: SelectSubset<T, ConsultationRequestUpdateArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ConsultationRequests.
     * @param {ConsultationRequestDeleteManyArgs} args - Arguments to filter ConsultationRequests to delete.
     * @example
     * // Delete a few ConsultationRequests
     * const { count } = await prisma.consultationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationRequestDeleteManyArgs>(args?: SelectSubset<T, ConsultationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsultationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConsultationRequests
     * const consultationRequest = await prisma.consultationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationRequestUpdateManyArgs>(args: SelectSubset<T, ConsultationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ConsultationRequest.
     * @param {ConsultationRequestUpsertArgs} args - Arguments to update or create a ConsultationRequest.
     * @example
     * // Update or create a ConsultationRequest
     * const consultationRequest = await prisma.consultationRequest.upsert({
     *   create: {
     *     // ... data to create a ConsultationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConsultationRequest we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationRequestUpsertArgs>(args: SelectSubset<T, ConsultationRequestUpsertArgs<ExtArgs>>): Prisma__ConsultationRequestClient<$Result.GetResult<Prisma.$ConsultationRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ConsultationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestCountArgs} args - Arguments to filter ConsultationRequests to count.
     * @example
     * // Count the number of ConsultationRequests
     * const count = await prisma.consultationRequest.count({
     *   where: {
     *     // ... the filter for the ConsultationRequests we want to count
     *   }
     * })
    **/
    count<T extends ConsultationRequestCountArgs>(
      args?: Subset<T, ConsultationRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConsultationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationRequestAggregateArgs>(args: Subset<T, ConsultationRequestAggregateArgs>): Prisma.PrismaPromise<GetConsultationRequestAggregateType<T>>

    /**
     * Group by ConsultationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationRequestGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConsultationRequest model
   */
  readonly fields: ConsultationRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConsultationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    employee<T extends ConsultationRequest$employeeArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationRequest$employeeArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    scheduledAppointment<T extends ConsultationRequest$scheduledAppointmentArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationRequest$scheduledAppointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConsultationRequest model
   */ 
  interface ConsultationRequestFieldRefs {
    readonly id: FieldRef<"ConsultationRequest", 'Int'>
    readonly clientName: FieldRef<"ConsultationRequest", 'String'>
    readonly clientEmail: FieldRef<"ConsultationRequest", 'String'>
    readonly clientPhone: FieldRef<"ConsultationRequest", 'String'>
    readonly serviceId: FieldRef<"ConsultationRequest", 'Int'>
    readonly employeeId: FieldRef<"ConsultationRequest", 'Int'>
    readonly description: FieldRef<"ConsultationRequest", 'String'>
    readonly referenceImages: FieldRef<"ConsultationRequest", 'Json'>
    readonly status: FieldRef<"ConsultationRequest", 'ConsultationStatus'>
    readonly scheduledAppointmentId: FieldRef<"ConsultationRequest", 'Int'>
    readonly createdAt: FieldRef<"ConsultationRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConsultationRequest findUnique
   */
  export type ConsultationRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationRequest to fetch.
     */
    where: ConsultationRequestWhereUniqueInput
  }

  /**
   * ConsultationRequest findUniqueOrThrow
   */
  export type ConsultationRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationRequest to fetch.
     */
    where: ConsultationRequestWhereUniqueInput
  }

  /**
   * ConsultationRequest findFirst
   */
  export type ConsultationRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationRequest to fetch.
     */
    where?: ConsultationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationRequests to fetch.
     */
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationRequests.
     */
    cursor?: ConsultationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationRequests.
     */
    distinct?: ConsultationRequestScalarFieldEnum | ConsultationRequestScalarFieldEnum[]
  }

  /**
   * ConsultationRequest findFirstOrThrow
   */
  export type ConsultationRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationRequest to fetch.
     */
    where?: ConsultationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationRequests to fetch.
     */
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationRequests.
     */
    cursor?: ConsultationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationRequests.
     */
    distinct?: ConsultationRequestScalarFieldEnum | ConsultationRequestScalarFieldEnum[]
  }

  /**
   * ConsultationRequest findMany
   */
  export type ConsultationRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationRequests to fetch.
     */
    where?: ConsultationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationRequests to fetch.
     */
    orderBy?: ConsultationRequestOrderByWithRelationInput | ConsultationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConsultationRequests.
     */
    cursor?: ConsultationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationRequests.
     */
    skip?: number
    distinct?: ConsultationRequestScalarFieldEnum | ConsultationRequestScalarFieldEnum[]
  }

  /**
   * ConsultationRequest create
   */
  export type ConsultationRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ConsultationRequest.
     */
    data: XOR<ConsultationRequestCreateInput, ConsultationRequestUncheckedCreateInput>
  }

  /**
   * ConsultationRequest createMany
   */
  export type ConsultationRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConsultationRequests.
     */
    data: ConsultationRequestCreateManyInput | ConsultationRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConsultationRequest update
   */
  export type ConsultationRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ConsultationRequest.
     */
    data: XOR<ConsultationRequestUpdateInput, ConsultationRequestUncheckedUpdateInput>
    /**
     * Choose, which ConsultationRequest to update.
     */
    where: ConsultationRequestWhereUniqueInput
  }

  /**
   * ConsultationRequest updateMany
   */
  export type ConsultationRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConsultationRequests.
     */
    data: XOR<ConsultationRequestUpdateManyMutationInput, ConsultationRequestUncheckedUpdateManyInput>
    /**
     * Filter which ConsultationRequests to update
     */
    where?: ConsultationRequestWhereInput
  }

  /**
   * ConsultationRequest upsert
   */
  export type ConsultationRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ConsultationRequest to update in case it exists.
     */
    where: ConsultationRequestWhereUniqueInput
    /**
     * In case the ConsultationRequest found by the `where` argument doesn't exist, create a new ConsultationRequest with this data.
     */
    create: XOR<ConsultationRequestCreateInput, ConsultationRequestUncheckedCreateInput>
    /**
     * In case the ConsultationRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationRequestUpdateInput, ConsultationRequestUncheckedUpdateInput>
  }

  /**
   * ConsultationRequest delete
   */
  export type ConsultationRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
    /**
     * Filter which ConsultationRequest to delete.
     */
    where: ConsultationRequestWhereUniqueInput
  }

  /**
   * ConsultationRequest deleteMany
   */
  export type ConsultationRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationRequests to delete
     */
    where?: ConsultationRequestWhereInput
  }

  /**
   * ConsultationRequest.employee
   */
  export type ConsultationRequest$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * ConsultationRequest.scheduledAppointment
   */
  export type ConsultationRequest$scheduledAppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * ConsultationRequest without action
   */
  export type ConsultationRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationRequest
     */
    select?: ConsultationRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationRequestInclude<ExtArgs> | null
  }


  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type BlogPostSumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    content: string | null
    excerpt: string | null
    coverImageUrl: string | null
    authorId: number | null
    publishedAt: Date | null
    seoTitle: string | null
    seoDescription: string | null
    isPublished: boolean | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    content: string | null
    excerpt: string | null
    coverImageUrl: string | null
    authorId: number | null
    publishedAt: Date | null
    seoTitle: string | null
    seoDescription: string | null
    isPublished: boolean | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    content: number
    excerpt: number
    coverImageUrl: number
    authorId: number
    publishedAt: number
    seoTitle: number
    seoDescription: number
    isPublished: number
    _all: number
  }


  export type BlogPostAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type BlogPostSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type BlogPostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    coverImageUrl?: true
    authorId?: true
    publishedAt?: true
    seoTitle?: true
    seoDescription?: true
    isPublished?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    coverImageUrl?: true
    authorId?: true
    publishedAt?: true
    seoTitle?: true
    seoDescription?: true
    isPublished?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    coverImageUrl?: true
    authorId?: true
    publishedAt?: true
    seoTitle?: true
    seoDescription?: true
    isPublished?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _avg?: BlogPostAvgAggregateInputType
    _sum?: BlogPostSumAggregateInputType
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string | null
    coverImageUrl: string | null
    authorId: number
    publishedAt: Date | null
    seoTitle: string | null
    seoDescription: string | null
    isPublished: boolean
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    excerpt?: boolean
    coverImageUrl?: boolean
    authorId?: boolean
    publishedAt?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    isPublished?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPost"]>


  export type BlogPostSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    excerpt?: boolean
    coverImageUrl?: boolean
    authorId?: boolean
    publishedAt?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    isPublished?: boolean
  }

  export type BlogPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      slug: string
      content: string
      excerpt: string | null
      coverImageUrl: string | null
      authorId: number
      publishedAt: Date | null
      seoTitle: string | null
      seoDescription: string | null
      isPublished: boolean
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogPost model
   */ 
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'Int'>
    readonly title: FieldRef<"BlogPost", 'String'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly content: FieldRef<"BlogPost", 'String'>
    readonly excerpt: FieldRef<"BlogPost", 'String'>
    readonly coverImageUrl: FieldRef<"BlogPost", 'String'>
    readonly authorId: FieldRef<"BlogPost", 'Int'>
    readonly publishedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly seoTitle: FieldRef<"BlogPost", 'String'>
    readonly seoDescription: FieldRef<"BlogPost", 'String'>
    readonly isPublished: FieldRef<"BlogPost", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    bio: 'bio',
    photoUrl: 'photoUrl',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    description: 'description',
    durationMin: 'durationMin',
    price: 'price',
    requiresConsultation: 'requiresConsultation',
    isActive: 'isActive'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const EmployeeServiceScalarFieldEnum: {
    employeeId: 'employeeId',
    serviceId: 'serviceId'
  };

  export type EmployeeServiceScalarFieldEnum = (typeof EmployeeServiceScalarFieldEnum)[keyof typeof EmployeeServiceScalarFieldEnum]


  export const WorkScheduleScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    isActive: 'isActive'
  };

  export type WorkScheduleScalarFieldEnum = (typeof WorkScheduleScalarFieldEnum)[keyof typeof WorkScheduleScalarFieldEnum]


  export const TimeBlockScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    startDatetime: 'startDatetime',
    endDatetime: 'endDatetime',
    type: 'type',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type TimeBlockScalarFieldEnum = (typeof TimeBlockScalarFieldEnum)[keyof typeof TimeBlockScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    clientName: 'clientName',
    clientEmail: 'clientEmail',
    clientPhone: 'clientPhone',
    employeeId: 'employeeId',
    serviceId: 'serviceId',
    startDatetime: 'startDatetime',
    endDatetime: 'endDatetime',
    status: 'status',
    notes: 'notes',
    cancelToken: 'cancelToken',
    createdAt: 'createdAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ConsultationRequestScalarFieldEnum: {
    id: 'id',
    clientName: 'clientName',
    clientEmail: 'clientEmail',
    clientPhone: 'clientPhone',
    serviceId: 'serviceId',
    employeeId: 'employeeId',
    description: 'description',
    referenceImages: 'referenceImages',
    status: 'status',
    scheduledAppointmentId: 'scheduledAppointmentId',
    createdAt: 'createdAt'
  };

  export type ConsultationRequestScalarFieldEnum = (typeof ConsultationRequestScalarFieldEnum)[keyof typeof ConsultationRequestScalarFieldEnum]


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    content: 'content',
    excerpt: 'excerpt',
    coverImageUrl: 'coverImageUrl',
    authorId: 'authorId',
    publishedAt: 'publishedAt',
    seoTitle: 'seoTitle',
    seoDescription: 'seoDescription',
    isPublished: 'isPublished'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ServiceCategory'
   */
  export type EnumServiceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategory'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'TimeBlockType'
   */
  export type EnumTimeBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeBlockType'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ConsultationStatus'
   */
  export type EnumConsultationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    employee?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
    blogPosts?: BlogPostListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    blogPosts?: BlogPostOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    employee?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
    blogPosts?: BlogPostListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: IntFilter<"Employee"> | number
    userId?: IntFilter<"Employee"> | number
    name?: StringFilter<"Employee"> | string
    bio?: StringNullableFilter<"Employee"> | string | null
    photoUrl?: StringNullableFilter<"Employee"> | string | null
    isActive?: BoolFilter<"Employee"> | boolean
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: EmployeeServiceListRelationFilter
    workSchedules?: WorkScheduleListRelationFilter
    timeBlocks?: TimeBlockListRelationFilter
    appointments?: AppointmentListRelationFilter
    consultations?: ConsultationRequestListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    services?: EmployeeServiceOrderByRelationAggregateInput
    workSchedules?: WorkScheduleOrderByRelationAggregateInput
    timeBlocks?: TimeBlockOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    consultations?: ConsultationRequestOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    name?: StringFilter<"Employee"> | string
    bio?: StringNullableFilter<"Employee"> | string | null
    photoUrl?: StringNullableFilter<"Employee"> | string | null
    isActive?: BoolFilter<"Employee"> | boolean
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: EmployeeServiceListRelationFilter
    workSchedules?: WorkScheduleListRelationFilter
    timeBlocks?: TimeBlockListRelationFilter
    appointments?: AppointmentListRelationFilter
    consultations?: ConsultationRequestListRelationFilter
  }, "id" | "userId">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _avg?: EmployeeAvgOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
    _sum?: EmployeeSumOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Employee"> | number
    userId?: IntWithAggregatesFilter<"Employee"> | number
    name?: StringWithAggregatesFilter<"Employee"> | string
    bio?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    isActive?: BoolWithAggregatesFilter<"Employee"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: IntFilter<"Service"> | number
    name?: StringFilter<"Service"> | string
    category?: EnumServiceCategoryFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableFilter<"Service"> | string | null
    durationMin?: IntFilter<"Service"> | number
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFilter<"Service"> | boolean
    isActive?: BoolFilter<"Service"> | boolean
    employees?: EmployeeServiceListRelationFilter
    appointments?: AppointmentListRelationFilter
    consultations?: ConsultationRequestListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    requiresConsultation?: SortOrder
    isActive?: SortOrder
    employees?: EmployeeServiceOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    consultations?: ConsultationRequestOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    category?: EnumServiceCategoryFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableFilter<"Service"> | string | null
    durationMin?: IntFilter<"Service"> | number
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFilter<"Service"> | boolean
    isActive?: BoolFilter<"Service"> | boolean
    employees?: EmployeeServiceListRelationFilter
    appointments?: AppointmentListRelationFilter
    consultations?: ConsultationRequestListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    requiresConsultation?: SortOrder
    isActive?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Service"> | number
    name?: StringWithAggregatesFilter<"Service"> | string
    category?: EnumServiceCategoryWithAggregatesFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    durationMin?: IntWithAggregatesFilter<"Service"> | number
    price?: DecimalWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolWithAggregatesFilter<"Service"> | boolean
    isActive?: BoolWithAggregatesFilter<"Service"> | boolean
  }

  export type EmployeeServiceWhereInput = {
    AND?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    OR?: EmployeeServiceWhereInput[]
    NOT?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    employeeId?: IntFilter<"EmployeeService"> | number
    serviceId?: IntFilter<"EmployeeService"> | number
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }

  export type EmployeeServiceOrderByWithRelationInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type EmployeeServiceWhereUniqueInput = Prisma.AtLeast<{
    employeeId_serviceId?: EmployeeServiceEmployeeIdServiceIdCompoundUniqueInput
    AND?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    OR?: EmployeeServiceWhereInput[]
    NOT?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    employeeId?: IntFilter<"EmployeeService"> | number
    serviceId?: IntFilter<"EmployeeService"> | number
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }, "employeeId_serviceId">

  export type EmployeeServiceOrderByWithAggregationInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
    _count?: EmployeeServiceCountOrderByAggregateInput
    _avg?: EmployeeServiceAvgOrderByAggregateInput
    _max?: EmployeeServiceMaxOrderByAggregateInput
    _min?: EmployeeServiceMinOrderByAggregateInput
    _sum?: EmployeeServiceSumOrderByAggregateInput
  }

  export type EmployeeServiceScalarWhereWithAggregatesInput = {
    AND?: EmployeeServiceScalarWhereWithAggregatesInput | EmployeeServiceScalarWhereWithAggregatesInput[]
    OR?: EmployeeServiceScalarWhereWithAggregatesInput[]
    NOT?: EmployeeServiceScalarWhereWithAggregatesInput | EmployeeServiceScalarWhereWithAggregatesInput[]
    employeeId?: IntWithAggregatesFilter<"EmployeeService"> | number
    serviceId?: IntWithAggregatesFilter<"EmployeeService"> | number
  }

  export type WorkScheduleWhereInput = {
    AND?: WorkScheduleWhereInput | WorkScheduleWhereInput[]
    OR?: WorkScheduleWhereInput[]
    NOT?: WorkScheduleWhereInput | WorkScheduleWhereInput[]
    id?: IntFilter<"WorkSchedule"> | number
    employeeId?: IntFilter<"WorkSchedule"> | number
    dayOfWeek?: IntFilter<"WorkSchedule"> | number
    startTime?: StringFilter<"WorkSchedule"> | string
    endTime?: StringFilter<"WorkSchedule"> | string
    isActive?: BoolFilter<"WorkSchedule"> | boolean
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type WorkScheduleOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type WorkScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WorkScheduleWhereInput | WorkScheduleWhereInput[]
    OR?: WorkScheduleWhereInput[]
    NOT?: WorkScheduleWhereInput | WorkScheduleWhereInput[]
    employeeId?: IntFilter<"WorkSchedule"> | number
    dayOfWeek?: IntFilter<"WorkSchedule"> | number
    startTime?: StringFilter<"WorkSchedule"> | string
    endTime?: StringFilter<"WorkSchedule"> | string
    isActive?: BoolFilter<"WorkSchedule"> | boolean
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }, "id">

  export type WorkScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
    _count?: WorkScheduleCountOrderByAggregateInput
    _avg?: WorkScheduleAvgOrderByAggregateInput
    _max?: WorkScheduleMaxOrderByAggregateInput
    _min?: WorkScheduleMinOrderByAggregateInput
    _sum?: WorkScheduleSumOrderByAggregateInput
  }

  export type WorkScheduleScalarWhereWithAggregatesInput = {
    AND?: WorkScheduleScalarWhereWithAggregatesInput | WorkScheduleScalarWhereWithAggregatesInput[]
    OR?: WorkScheduleScalarWhereWithAggregatesInput[]
    NOT?: WorkScheduleScalarWhereWithAggregatesInput | WorkScheduleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorkSchedule"> | number
    employeeId?: IntWithAggregatesFilter<"WorkSchedule"> | number
    dayOfWeek?: IntWithAggregatesFilter<"WorkSchedule"> | number
    startTime?: StringWithAggregatesFilter<"WorkSchedule"> | string
    endTime?: StringWithAggregatesFilter<"WorkSchedule"> | string
    isActive?: BoolWithAggregatesFilter<"WorkSchedule"> | boolean
  }

  export type TimeBlockWhereInput = {
    AND?: TimeBlockWhereInput | TimeBlockWhereInput[]
    OR?: TimeBlockWhereInput[]
    NOT?: TimeBlockWhereInput | TimeBlockWhereInput[]
    id?: IntFilter<"TimeBlock"> | number
    employeeId?: IntFilter<"TimeBlock"> | number
    startDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    endDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    type?: EnumTimeBlockTypeFilter<"TimeBlock"> | $Enums.TimeBlockType
    reason?: StringNullableFilter<"TimeBlock"> | string | null
    createdAt?: DateTimeFilter<"TimeBlock"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type TimeBlockOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type TimeBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TimeBlockWhereInput | TimeBlockWhereInput[]
    OR?: TimeBlockWhereInput[]
    NOT?: TimeBlockWhereInput | TimeBlockWhereInput[]
    employeeId?: IntFilter<"TimeBlock"> | number
    startDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    endDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    type?: EnumTimeBlockTypeFilter<"TimeBlock"> | $Enums.TimeBlockType
    reason?: StringNullableFilter<"TimeBlock"> | string | null
    createdAt?: DateTimeFilter<"TimeBlock"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }, "id">

  export type TimeBlockOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    type?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TimeBlockCountOrderByAggregateInput
    _avg?: TimeBlockAvgOrderByAggregateInput
    _max?: TimeBlockMaxOrderByAggregateInput
    _min?: TimeBlockMinOrderByAggregateInput
    _sum?: TimeBlockSumOrderByAggregateInput
  }

  export type TimeBlockScalarWhereWithAggregatesInput = {
    AND?: TimeBlockScalarWhereWithAggregatesInput | TimeBlockScalarWhereWithAggregatesInput[]
    OR?: TimeBlockScalarWhereWithAggregatesInput[]
    NOT?: TimeBlockScalarWhereWithAggregatesInput | TimeBlockScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TimeBlock"> | number
    employeeId?: IntWithAggregatesFilter<"TimeBlock"> | number
    startDatetime?: DateTimeWithAggregatesFilter<"TimeBlock"> | Date | string
    endDatetime?: DateTimeWithAggregatesFilter<"TimeBlock"> | Date | string
    type?: EnumTimeBlockTypeWithAggregatesFilter<"TimeBlock"> | $Enums.TimeBlockType
    reason?: StringNullableWithAggregatesFilter<"TimeBlock"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TimeBlock"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringFilter<"Appointment"> | string
    clientPhone?: StringFilter<"Appointment"> | string
    employeeId?: IntFilter<"Appointment"> | number
    serviceId?: IntFilter<"Appointment"> | number
    startDatetime?: DateTimeFilter<"Appointment"> | Date | string
    endDatetime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    cancelToken?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    consultation?: XOR<ConsultationRequestNullableRelationFilter, ConsultationRequestWhereInput> | null
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    cancelToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    consultation?: ConsultationRequestOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cancelToken?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringFilter<"Appointment"> | string
    clientPhone?: StringFilter<"Appointment"> | string
    employeeId?: IntFilter<"Appointment"> | number
    serviceId?: IntFilter<"Appointment"> | number
    startDatetime?: DateTimeFilter<"Appointment"> | Date | string
    endDatetime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    consultation?: XOR<ConsultationRequestNullableRelationFilter, ConsultationRequestWhereInput> | null
  }, "id" | "cancelToken">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    cancelToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    clientName?: StringWithAggregatesFilter<"Appointment"> | string
    clientEmail?: StringWithAggregatesFilter<"Appointment"> | string
    clientPhone?: StringWithAggregatesFilter<"Appointment"> | string
    employeeId?: IntWithAggregatesFilter<"Appointment"> | number
    serviceId?: IntWithAggregatesFilter<"Appointment"> | number
    startDatetime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    endDatetime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    cancelToken?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ConsultationRequestWhereInput = {
    AND?: ConsultationRequestWhereInput | ConsultationRequestWhereInput[]
    OR?: ConsultationRequestWhereInput[]
    NOT?: ConsultationRequestWhereInput | ConsultationRequestWhereInput[]
    id?: IntFilter<"ConsultationRequest"> | number
    clientName?: StringFilter<"ConsultationRequest"> | string
    clientEmail?: StringFilter<"ConsultationRequest"> | string
    clientPhone?: StringFilter<"ConsultationRequest"> | string
    serviceId?: IntFilter<"ConsultationRequest"> | number
    employeeId?: IntNullableFilter<"ConsultationRequest"> | number | null
    description?: StringFilter<"ConsultationRequest"> | string
    referenceImages?: JsonNullableFilter<"ConsultationRequest">
    status?: EnumConsultationStatusFilter<"ConsultationRequest"> | $Enums.ConsultationStatus
    scheduledAppointmentId?: IntNullableFilter<"ConsultationRequest"> | number | null
    createdAt?: DateTimeFilter<"ConsultationRequest"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    employee?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
    scheduledAppointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
  }

  export type ConsultationRequestOrderByWithRelationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    description?: SortOrder
    referenceImages?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAppointmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    service?: ServiceOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
    scheduledAppointment?: AppointmentOrderByWithRelationInput
  }

  export type ConsultationRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    scheduledAppointmentId?: number
    AND?: ConsultationRequestWhereInput | ConsultationRequestWhereInput[]
    OR?: ConsultationRequestWhereInput[]
    NOT?: ConsultationRequestWhereInput | ConsultationRequestWhereInput[]
    clientName?: StringFilter<"ConsultationRequest"> | string
    clientEmail?: StringFilter<"ConsultationRequest"> | string
    clientPhone?: StringFilter<"ConsultationRequest"> | string
    serviceId?: IntFilter<"ConsultationRequest"> | number
    employeeId?: IntNullableFilter<"ConsultationRequest"> | number | null
    description?: StringFilter<"ConsultationRequest"> | string
    referenceImages?: JsonNullableFilter<"ConsultationRequest">
    status?: EnumConsultationStatusFilter<"ConsultationRequest"> | $Enums.ConsultationStatus
    createdAt?: DateTimeFilter<"ConsultationRequest"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    employee?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
    scheduledAppointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
  }, "id" | "scheduledAppointmentId">

  export type ConsultationRequestOrderByWithAggregationInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    description?: SortOrder
    referenceImages?: SortOrderInput | SortOrder
    status?: SortOrder
    scheduledAppointmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ConsultationRequestCountOrderByAggregateInput
    _avg?: ConsultationRequestAvgOrderByAggregateInput
    _max?: ConsultationRequestMaxOrderByAggregateInput
    _min?: ConsultationRequestMinOrderByAggregateInput
    _sum?: ConsultationRequestSumOrderByAggregateInput
  }

  export type ConsultationRequestScalarWhereWithAggregatesInput = {
    AND?: ConsultationRequestScalarWhereWithAggregatesInput | ConsultationRequestScalarWhereWithAggregatesInput[]
    OR?: ConsultationRequestScalarWhereWithAggregatesInput[]
    NOT?: ConsultationRequestScalarWhereWithAggregatesInput | ConsultationRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ConsultationRequest"> | number
    clientName?: StringWithAggregatesFilter<"ConsultationRequest"> | string
    clientEmail?: StringWithAggregatesFilter<"ConsultationRequest"> | string
    clientPhone?: StringWithAggregatesFilter<"ConsultationRequest"> | string
    serviceId?: IntWithAggregatesFilter<"ConsultationRequest"> | number
    employeeId?: IntNullableWithAggregatesFilter<"ConsultationRequest"> | number | null
    description?: StringWithAggregatesFilter<"ConsultationRequest"> | string
    referenceImages?: JsonNullableWithAggregatesFilter<"ConsultationRequest">
    status?: EnumConsultationStatusWithAggregatesFilter<"ConsultationRequest"> | $Enums.ConsultationStatus
    scheduledAppointmentId?: IntNullableWithAggregatesFilter<"ConsultationRequest"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ConsultationRequest"> | Date | string
  }

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: IntFilter<"BlogPost"> | number
    title?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    coverImageUrl?: StringNullableFilter<"BlogPost"> | string | null
    authorId?: IntFilter<"BlogPost"> | number
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    seoTitle?: StringNullableFilter<"BlogPost"> | string | null
    seoDescription?: StringNullableFilter<"BlogPost"> | string | null
    isPublished?: BoolFilter<"BlogPost"> | boolean
    author?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    authorId?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    author?: UserOrderByWithRelationInput
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    title?: StringFilter<"BlogPost"> | string
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    coverImageUrl?: StringNullableFilter<"BlogPost"> | string | null
    authorId?: IntFilter<"BlogPost"> | number
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    seoTitle?: StringNullableFilter<"BlogPost"> | string | null
    seoDescription?: StringNullableFilter<"BlogPost"> | string | null
    isPublished?: BoolFilter<"BlogPost"> | boolean
    author?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    authorId?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _avg?: BlogPostAvgOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
    _sum?: BlogPostSumOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogPost"> | number
    title?: StringWithAggregatesFilter<"BlogPost"> | string
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    content?: StringWithAggregatesFilter<"BlogPost"> | string
    excerpt?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    coverImageUrl?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    authorId?: IntWithAggregatesFilter<"BlogPost"> | number
    publishedAt?: DateTimeNullableWithAggregatesFilter<"BlogPost"> | Date | string | null
    seoTitle?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    seoDescription?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    isPublished?: BoolWithAggregatesFilter<"BlogPost"> | boolean
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    employee?: EmployeeCreateNestedOneWithoutUserInput
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneWithoutUserNestedInput
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceCreateNestedManyWithoutServiceInput
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUpdateManyWithoutServiceNestedInput
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: number
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
  }

  export type ServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeServiceCreateInput = {
    employee: EmployeeCreateNestedOneWithoutServicesInput
    service: ServiceCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeServiceUncheckedCreateInput = {
    employeeId: number
    serviceId: number
  }

  export type EmployeeServiceUpdateInput = {
    employee?: EmployeeUpdateOneRequiredWithoutServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type EmployeeServiceCreateManyInput = {
    employeeId: number
    serviceId: number
  }

  export type EmployeeServiceUpdateManyMutationInput = {

  }

  export type EmployeeServiceUncheckedUpdateManyInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type WorkScheduleCreateInput = {
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
    employee: EmployeeCreateNestedOneWithoutWorkSchedulesInput
  }

  export type WorkScheduleUncheckedCreateInput = {
    id?: number
    employeeId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
  }

  export type WorkScheduleUpdateInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employee?: EmployeeUpdateOneRequiredWithoutWorkSchedulesNestedInput
  }

  export type WorkScheduleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkScheduleCreateManyInput = {
    id?: number
    employeeId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
  }

  export type WorkScheduleUpdateManyMutationInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkScheduleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeBlockCreateInput = {
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutTimeBlocksInput
  }

  export type TimeBlockUncheckedCreateInput = {
    id?: number
    employeeId: number
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
  }

  export type TimeBlockUpdateInput = {
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutTimeBlocksNestedInput
  }

  export type TimeBlockUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeBlockCreateManyInput = {
    id?: number
    employeeId: number
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
  }

  export type TimeBlockUpdateManyMutationInput = {
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeBlockUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
    consultation?: ConsultationRequestCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    serviceId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    consultation?: ConsultationRequestUncheckedCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
    consultation?: ConsultationRequestUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationRequestUncheckedUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentCreateManyInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    serviceId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestCreateInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    createdAt?: Date | string
    service: ServiceCreateNestedOneWithoutConsultationsInput
    employee?: EmployeeCreateNestedOneWithoutConsultationsInput
    scheduledAppointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationRequestUncheckedCreateInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    employeeId?: number | null
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type ConsultationRequestUpdateInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutConsultationsNestedInput
    employee?: EmployeeUpdateOneWithoutConsultationsNestedInput
    scheduledAppointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestCreateManyInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    employeeId?: number | null
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type ConsultationRequestUpdateManyMutationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
    author: UserCreateNestedOneWithoutBlogPostsInput
  }

  export type BlogPostUncheckedCreateInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    authorId: number
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
  }

  export type BlogPostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutBlogPostsNestedInput
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BlogPostCreateManyInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    authorId: number
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
  }

  export type BlogPostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmployeeNullableRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type BlogPostListRelationFilter = {
    every?: BlogPostWhereInput
    some?: BlogPostWhereInput
    none?: BlogPostWhereInput
  }

  export type BlogPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmployeeServiceListRelationFilter = {
    every?: EmployeeServiceWhereInput
    some?: EmployeeServiceWhereInput
    none?: EmployeeServiceWhereInput
  }

  export type WorkScheduleListRelationFilter = {
    every?: WorkScheduleWhereInput
    some?: WorkScheduleWhereInput
    none?: WorkScheduleWhereInput
  }

  export type TimeBlockListRelationFilter = {
    every?: TimeBlockWhereInput
    some?: TimeBlockWhereInput
    none?: TimeBlockWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type ConsultationRequestListRelationFilter = {
    every?: ConsultationRequestWhereInput
    some?: ConsultationRequestWhereInput
    none?: ConsultationRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployeeServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TimeBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumServiceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[]
    notIn?: $Enums.ServiceCategory[]
    not?: NestedEnumServiceCategoryFilter<$PrismaModel> | $Enums.ServiceCategory
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    requiresConsultation?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    requiresConsultation?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    requiresConsultation?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
  }

  export type EnumServiceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[]
    notIn?: $Enums.ServiceCategory[]
    not?: NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type EmployeeServiceEmployeeIdServiceIdCompoundUniqueInput = {
    employeeId: number
    serviceId: number
  }

  export type EmployeeServiceCountOrderByAggregateInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type EmployeeServiceAvgOrderByAggregateInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type EmployeeServiceMaxOrderByAggregateInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type EmployeeServiceMinOrderByAggregateInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type EmployeeServiceSumOrderByAggregateInput = {
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type WorkScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
  }

  export type WorkScheduleAvgOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type WorkScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
  }

  export type WorkScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
  }

  export type WorkScheduleSumOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type EnumTimeBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeBlockType | EnumTimeBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeBlockType[]
    notIn?: $Enums.TimeBlockType[]
    not?: NestedEnumTimeBlockTypeFilter<$PrismaModel> | $Enums.TimeBlockType
  }

  export type TimeBlockCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type TimeBlockAvgOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
  }

  export type TimeBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type TimeBlockMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    type?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type TimeBlockSumOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
  }

  export type EnumTimeBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeBlockType | EnumTimeBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeBlockType[]
    notIn?: $Enums.TimeBlockType[]
    not?: NestedEnumTimeBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeBlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumTimeBlockTypeFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type ConsultationRequestNullableRelationFilter = {
    is?: ConsultationRequestWhereInput | null
    isNot?: ConsultationRequestWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    cancelToken?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    cancelToken?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    startDatetime?: SortOrder
    endDatetime?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    cancelToken?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumConsultationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[]
    notIn?: $Enums.ConsultationStatus[]
    not?: NestedEnumConsultationStatusFilter<$PrismaModel> | $Enums.ConsultationStatus
  }

  export type AppointmentNullableRelationFilter = {
    is?: AppointmentWhereInput | null
    isNot?: AppointmentWhereInput | null
  }

  export type ConsultationRequestCountOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrder
    description?: SortOrder
    referenceImages?: SortOrder
    status?: SortOrder
    scheduledAppointmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsultationRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrder
    scheduledAppointmentId?: SortOrder
  }

  export type ConsultationRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    scheduledAppointmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsultationRequestMinOrderByAggregateInput = {
    id?: SortOrder
    clientName?: SortOrder
    clientEmail?: SortOrder
    clientPhone?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    scheduledAppointmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsultationRequestSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    employeeId?: SortOrder
    scheduledAppointmentId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumConsultationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[]
    notIn?: $Enums.ConsultationStatus[]
    not?: NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationStatusFilter<$PrismaModel>
    _max?: NestedEnumConsultationStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    coverImageUrl?: SortOrder
    authorId?: SortOrder
    publishedAt?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    isPublished?: SortOrder
  }

  export type BlogPostAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    coverImageUrl?: SortOrder
    authorId?: SortOrder
    publishedAt?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    isPublished?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    coverImageUrl?: SortOrder
    authorId?: SortOrder
    publishedAt?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    isPublished?: SortOrder
  }

  export type BlogPostSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmployeeCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BlogPostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BlogPostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmployeeUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    upsert?: EmployeeUpsertWithoutUserInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutUserInput, EmployeeUpdateWithoutUserInput>, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type BlogPostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutAuthorInput | BlogPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutAuthorInput | BlogPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutAuthorInput | BlogPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUserInput
    upsert?: EmployeeUpsertWithoutUserInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutUserInput, EmployeeUpdateWithoutUserInput>, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type BlogPostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutAuthorInput | BlogPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutAuthorInput | BlogPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutAuthorInput | BlogPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeInput
    connect?: UserWhereUniqueInput
  }

  export type EmployeeServiceCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type WorkScheduleCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput> | WorkScheduleCreateWithoutEmployeeInput[] | WorkScheduleUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkScheduleCreateOrConnectWithoutEmployeeInput | WorkScheduleCreateOrConnectWithoutEmployeeInput[]
    createMany?: WorkScheduleCreateManyEmployeeInputEnvelope
    connect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
  }

  export type TimeBlockCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput> | TimeBlockCreateWithoutEmployeeInput[] | TimeBlockUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeBlockCreateOrConnectWithoutEmployeeInput | TimeBlockCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeBlockCreateManyEmployeeInputEnvelope
    connect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput> | AppointmentCreateWithoutEmployeeInput[] | AppointmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutEmployeeInput | AppointmentCreateOrConnectWithoutEmployeeInput[]
    createMany?: AppointmentCreateManyEmployeeInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ConsultationRequestCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput> | ConsultationRequestCreateWithoutEmployeeInput[] | ConsultationRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutEmployeeInput | ConsultationRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: ConsultationRequestCreateManyEmployeeInputEnvelope
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
  }

  export type EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput> | WorkScheduleCreateWithoutEmployeeInput[] | WorkScheduleUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkScheduleCreateOrConnectWithoutEmployeeInput | WorkScheduleCreateOrConnectWithoutEmployeeInput[]
    createMany?: WorkScheduleCreateManyEmployeeInputEnvelope
    connect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
  }

  export type TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput> | TimeBlockCreateWithoutEmployeeInput[] | TimeBlockUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeBlockCreateOrConnectWithoutEmployeeInput | TimeBlockCreateOrConnectWithoutEmployeeInput[]
    createMany?: TimeBlockCreateManyEmployeeInputEnvelope
    connect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput> | AppointmentCreateWithoutEmployeeInput[] | AppointmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutEmployeeInput | AppointmentCreateOrConnectWithoutEmployeeInput[]
    createMany?: AppointmentCreateManyEmployeeInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput> | ConsultationRequestCreateWithoutEmployeeInput[] | ConsultationRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutEmployeeInput | ConsultationRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: ConsultationRequestCreateManyEmployeeInputEnvelope
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutEmployeeNestedInput = {
    create?: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeInput
    upsert?: UserUpsertWithoutEmployeeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployeeInput, UserUpdateWithoutEmployeeInput>, UserUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeServiceUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput | EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type WorkScheduleUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput> | WorkScheduleCreateWithoutEmployeeInput[] | WorkScheduleUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkScheduleCreateOrConnectWithoutEmployeeInput | WorkScheduleCreateOrConnectWithoutEmployeeInput[]
    upsert?: WorkScheduleUpsertWithWhereUniqueWithoutEmployeeInput | WorkScheduleUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: WorkScheduleCreateManyEmployeeInputEnvelope
    set?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    disconnect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    delete?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    connect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    update?: WorkScheduleUpdateWithWhereUniqueWithoutEmployeeInput | WorkScheduleUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: WorkScheduleUpdateManyWithWhereWithoutEmployeeInput | WorkScheduleUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: WorkScheduleScalarWhereInput | WorkScheduleScalarWhereInput[]
  }

  export type TimeBlockUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput> | TimeBlockCreateWithoutEmployeeInput[] | TimeBlockUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeBlockCreateOrConnectWithoutEmployeeInput | TimeBlockCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeBlockUpsertWithWhereUniqueWithoutEmployeeInput | TimeBlockUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeBlockCreateManyEmployeeInputEnvelope
    set?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    disconnect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    delete?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    connect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    update?: TimeBlockUpdateWithWhereUniqueWithoutEmployeeInput | TimeBlockUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeBlockUpdateManyWithWhereWithoutEmployeeInput | TimeBlockUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeBlockScalarWhereInput | TimeBlockScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput> | AppointmentCreateWithoutEmployeeInput[] | AppointmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutEmployeeInput | AppointmentCreateOrConnectWithoutEmployeeInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutEmployeeInput | AppointmentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AppointmentCreateManyEmployeeInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutEmployeeInput | AppointmentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutEmployeeInput | AppointmentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ConsultationRequestUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput> | ConsultationRequestCreateWithoutEmployeeInput[] | ConsultationRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutEmployeeInput | ConsultationRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: ConsultationRequestUpsertWithWhereUniqueWithoutEmployeeInput | ConsultationRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: ConsultationRequestCreateManyEmployeeInputEnvelope
    set?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    disconnect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    delete?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    update?: ConsultationRequestUpdateWithWhereUniqueWithoutEmployeeInput | ConsultationRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: ConsultationRequestUpdateManyWithWhereWithoutEmployeeInput | ConsultationRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput | EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput> | WorkScheduleCreateWithoutEmployeeInput[] | WorkScheduleUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: WorkScheduleCreateOrConnectWithoutEmployeeInput | WorkScheduleCreateOrConnectWithoutEmployeeInput[]
    upsert?: WorkScheduleUpsertWithWhereUniqueWithoutEmployeeInput | WorkScheduleUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: WorkScheduleCreateManyEmployeeInputEnvelope
    set?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    disconnect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    delete?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    connect?: WorkScheduleWhereUniqueInput | WorkScheduleWhereUniqueInput[]
    update?: WorkScheduleUpdateWithWhereUniqueWithoutEmployeeInput | WorkScheduleUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: WorkScheduleUpdateManyWithWhereWithoutEmployeeInput | WorkScheduleUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: WorkScheduleScalarWhereInput | WorkScheduleScalarWhereInput[]
  }

  export type TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput> | TimeBlockCreateWithoutEmployeeInput[] | TimeBlockUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TimeBlockCreateOrConnectWithoutEmployeeInput | TimeBlockCreateOrConnectWithoutEmployeeInput[]
    upsert?: TimeBlockUpsertWithWhereUniqueWithoutEmployeeInput | TimeBlockUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TimeBlockCreateManyEmployeeInputEnvelope
    set?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    disconnect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    delete?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    connect?: TimeBlockWhereUniqueInput | TimeBlockWhereUniqueInput[]
    update?: TimeBlockUpdateWithWhereUniqueWithoutEmployeeInput | TimeBlockUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TimeBlockUpdateManyWithWhereWithoutEmployeeInput | TimeBlockUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TimeBlockScalarWhereInput | TimeBlockScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput> | AppointmentCreateWithoutEmployeeInput[] | AppointmentUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutEmployeeInput | AppointmentCreateOrConnectWithoutEmployeeInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutEmployeeInput | AppointmentUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AppointmentCreateManyEmployeeInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutEmployeeInput | AppointmentUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutEmployeeInput | AppointmentUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput> | ConsultationRequestCreateWithoutEmployeeInput[] | ConsultationRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutEmployeeInput | ConsultationRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: ConsultationRequestUpsertWithWhereUniqueWithoutEmployeeInput | ConsultationRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: ConsultationRequestCreateManyEmployeeInputEnvelope
    set?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    disconnect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    delete?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    update?: ConsultationRequestUpdateWithWhereUniqueWithoutEmployeeInput | ConsultationRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: ConsultationRequestUpdateManyWithWhereWithoutEmployeeInput | ConsultationRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
  }

  export type EmployeeServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ConsultationRequestCreateNestedManyWithoutServiceInput = {
    create?: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput> | ConsultationRequestCreateWithoutServiceInput[] | ConsultationRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutServiceInput | ConsultationRequestCreateOrConnectWithoutServiceInput[]
    createMany?: ConsultationRequestCreateManyServiceInputEnvelope
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
  }

  export type EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ConsultationRequestUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput> | ConsultationRequestCreateWithoutServiceInput[] | ConsultationRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutServiceInput | ConsultationRequestCreateOrConnectWithoutServiceInput[]
    createMany?: ConsultationRequestCreateManyServiceInputEnvelope
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
  }

  export type EnumServiceCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ServiceCategory
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EmployeeServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput | EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput | EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutServiceInput | EmployeeServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ConsultationRequestUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput> | ConsultationRequestCreateWithoutServiceInput[] | ConsultationRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutServiceInput | ConsultationRequestCreateOrConnectWithoutServiceInput[]
    upsert?: ConsultationRequestUpsertWithWhereUniqueWithoutServiceInput | ConsultationRequestUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ConsultationRequestCreateManyServiceInputEnvelope
    set?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    disconnect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    delete?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    update?: ConsultationRequestUpdateWithWhereUniqueWithoutServiceInput | ConsultationRequestUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ConsultationRequestUpdateManyWithWhereWithoutServiceInput | ConsultationRequestUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput | EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput | EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutServiceInput | EmployeeServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput> | AppointmentCreateWithoutServiceInput[] | AppointmentUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutServiceInput | AppointmentCreateOrConnectWithoutServiceInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutServiceInput | AppointmentUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AppointmentCreateManyServiceInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutServiceInput | AppointmentUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutServiceInput | AppointmentUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ConsultationRequestUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput> | ConsultationRequestCreateWithoutServiceInput[] | ConsultationRequestUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutServiceInput | ConsultationRequestCreateOrConnectWithoutServiceInput[]
    upsert?: ConsultationRequestUpsertWithWhereUniqueWithoutServiceInput | ConsultationRequestUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ConsultationRequestCreateManyServiceInputEnvelope
    set?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    disconnect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    delete?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    connect?: ConsultationRequestWhereUniqueInput | ConsultationRequestWhereUniqueInput[]
    update?: ConsultationRequestUpdateWithWhereUniqueWithoutServiceInput | ConsultationRequestUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ConsultationRequestUpdateManyWithWhereWithoutServiceInput | ConsultationRequestUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutServicesInput = {
    create?: XOR<EmployeeCreateWithoutServicesInput, EmployeeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutServicesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<ServiceCreateWithoutEmployeesInput, ServiceUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEmployeesInput
    connect?: ServiceWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<EmployeeCreateWithoutServicesInput, EmployeeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutServicesInput
    upsert?: EmployeeUpsertWithoutServicesInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutServicesInput, EmployeeUpdateWithoutServicesInput>, EmployeeUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<ServiceCreateWithoutEmployeesInput, ServiceUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEmployeesInput
    upsert?: ServiceUpsertWithoutEmployeesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutEmployeesInput, ServiceUpdateWithoutEmployeesInput>, ServiceUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployeeCreateNestedOneWithoutWorkSchedulesInput = {
    create?: XOR<EmployeeCreateWithoutWorkSchedulesInput, EmployeeUncheckedCreateWithoutWorkSchedulesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWorkSchedulesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutWorkSchedulesNestedInput = {
    create?: XOR<EmployeeCreateWithoutWorkSchedulesInput, EmployeeUncheckedCreateWithoutWorkSchedulesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWorkSchedulesInput
    upsert?: EmployeeUpsertWithoutWorkSchedulesInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutWorkSchedulesInput, EmployeeUpdateWithoutWorkSchedulesInput>, EmployeeUncheckedUpdateWithoutWorkSchedulesInput>
  }

  export type EmployeeCreateNestedOneWithoutTimeBlocksInput = {
    create?: XOR<EmployeeCreateWithoutTimeBlocksInput, EmployeeUncheckedCreateWithoutTimeBlocksInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTimeBlocksInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EnumTimeBlockTypeFieldUpdateOperationsInput = {
    set?: $Enums.TimeBlockType
  }

  export type EmployeeUpdateOneRequiredWithoutTimeBlocksNestedInput = {
    create?: XOR<EmployeeCreateWithoutTimeBlocksInput, EmployeeUncheckedCreateWithoutTimeBlocksInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTimeBlocksInput
    upsert?: EmployeeUpsertWithoutTimeBlocksInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutTimeBlocksInput, EmployeeUpdateWithoutTimeBlocksInput>, EmployeeUncheckedUpdateWithoutTimeBlocksInput>
  }

  export type EmployeeCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<EmployeeCreateWithoutAppointmentsInput, EmployeeUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAppointmentsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
  }

  export type ConsultationRequestCreateNestedOneWithoutScheduledAppointmentInput = {
    create?: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutScheduledAppointmentInput
    connect?: ConsultationRequestWhereUniqueInput
  }

  export type ConsultationRequestUncheckedCreateNestedOneWithoutScheduledAppointmentInput = {
    create?: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutScheduledAppointmentInput
    connect?: ConsultationRequestWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type EmployeeUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<EmployeeCreateWithoutAppointmentsInput, EmployeeUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAppointmentsInput
    upsert?: EmployeeUpsertWithoutAppointmentsInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAppointmentsInput, EmployeeUpdateWithoutAppointmentsInput>, EmployeeUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAppointmentsInput
    upsert?: ServiceUpsertWithoutAppointmentsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAppointmentsInput, ServiceUpdateWithoutAppointmentsInput>, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ConsultationRequestUpdateOneWithoutScheduledAppointmentNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutScheduledAppointmentInput
    upsert?: ConsultationRequestUpsertWithoutScheduledAppointmentInput
    disconnect?: ConsultationRequestWhereInput | boolean
    delete?: ConsultationRequestWhereInput | boolean
    connect?: ConsultationRequestWhereUniqueInput
    update?: XOR<XOR<ConsultationRequestUpdateToOneWithWhereWithoutScheduledAppointmentInput, ConsultationRequestUpdateWithoutScheduledAppointmentInput>, ConsultationRequestUncheckedUpdateWithoutScheduledAppointmentInput>
  }

  export type ConsultationRequestUncheckedUpdateOneWithoutScheduledAppointmentNestedInput = {
    create?: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
    connectOrCreate?: ConsultationRequestCreateOrConnectWithoutScheduledAppointmentInput
    upsert?: ConsultationRequestUpsertWithoutScheduledAppointmentInput
    disconnect?: ConsultationRequestWhereInput | boolean
    delete?: ConsultationRequestWhereInput | boolean
    connect?: ConsultationRequestWhereUniqueInput
    update?: XOR<XOR<ConsultationRequestUpdateToOneWithWhereWithoutScheduledAppointmentInput, ConsultationRequestUpdateWithoutScheduledAppointmentInput>, ConsultationRequestUncheckedUpdateWithoutScheduledAppointmentInput>
  }

  export type ServiceCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<ServiceCreateWithoutConsultationsInput, ServiceUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutConsultationsInput
    connect?: ServiceWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutConsultationsInput = {
    create?: XOR<EmployeeCreateWithoutConsultationsInput, EmployeeUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutConsultationsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutConsultationInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    connect?: AppointmentWhereUniqueInput
  }

  export type EnumConsultationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConsultationStatus
  }

  export type ServiceUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: XOR<ServiceCreateWithoutConsultationsInput, ServiceUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutConsultationsInput
    upsert?: ServiceUpsertWithoutConsultationsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutConsultationsInput, ServiceUpdateWithoutConsultationsInput>, ServiceUncheckedUpdateWithoutConsultationsInput>
  }

  export type EmployeeUpdateOneWithoutConsultationsNestedInput = {
    create?: XOR<EmployeeCreateWithoutConsultationsInput, EmployeeUncheckedCreateWithoutConsultationsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutConsultationsInput
    upsert?: EmployeeUpsertWithoutConsultationsInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutConsultationsInput, EmployeeUpdateWithoutConsultationsInput>, EmployeeUncheckedUpdateWithoutConsultationsInput>
  }

  export type AppointmentUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutConsultationInput
    upsert?: AppointmentUpsertWithoutConsultationInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutConsultationInput, AppointmentUpdateWithoutConsultationInput>, AppointmentUncheckedUpdateWithoutConsultationInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutBlogPostsInput = {
    create?: XOR<UserCreateWithoutBlogPostsInput, UserUncheckedCreateWithoutBlogPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlogPostsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutBlogPostsNestedInput = {
    create?: XOR<UserCreateWithoutBlogPostsInput, UserUncheckedCreateWithoutBlogPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlogPostsInput
    upsert?: UserUpsertWithoutBlogPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlogPostsInput, UserUpdateWithoutBlogPostsInput>, UserUncheckedUpdateWithoutBlogPostsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumServiceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[]
    notIn?: $Enums.ServiceCategory[]
    not?: NestedEnumServiceCategoryFilter<$PrismaModel> | $Enums.ServiceCategory
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[]
    notIn?: $Enums.ServiceCategory[]
    not?: NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTimeBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeBlockType | EnumTimeBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeBlockType[]
    notIn?: $Enums.TimeBlockType[]
    not?: NestedEnumTimeBlockTypeFilter<$PrismaModel> | $Enums.TimeBlockType
  }

  export type NestedEnumTimeBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeBlockType | EnumTimeBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimeBlockType[]
    notIn?: $Enums.TimeBlockType[]
    not?: NestedEnumTimeBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimeBlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumTimeBlockTypeFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumConsultationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[]
    notIn?: $Enums.ConsultationStatus[]
    not?: NestedEnumConsultationStatusFilter<$PrismaModel> | $Enums.ConsultationStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsultationStatus | EnumConsultationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsultationStatus[]
    notIn?: $Enums.ConsultationStatus[]
    not?: NestedEnumConsultationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsultationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsultationStatusFilter<$PrismaModel>
    _max?: NestedEnumConsultationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmployeeCreateWithoutUserInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutUserInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
  }

  export type BlogPostCreateWithoutAuthorInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
  }

  export type BlogPostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
  }

  export type BlogPostCreateOrConnectWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput>
  }

  export type BlogPostCreateManyAuthorInputEnvelope = {
    data: BlogPostCreateManyAuthorInput | BlogPostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithoutUserInput = {
    update: XOR<EmployeeUpdateWithoutUserInput, EmployeeUncheckedUpdateWithoutUserInput>
    create: XOR<EmployeeCreateWithoutUserInput, EmployeeUncheckedCreateWithoutUserInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutUserInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutUserInput, EmployeeUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type BlogPostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    update: XOR<BlogPostUpdateWithoutAuthorInput, BlogPostUncheckedUpdateWithoutAuthorInput>
    create: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput>
  }

  export type BlogPostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    data: XOR<BlogPostUpdateWithoutAuthorInput, BlogPostUncheckedUpdateWithoutAuthorInput>
  }

  export type BlogPostUpdateManyWithWhereWithoutAuthorInput = {
    where: BlogPostScalarWhereInput
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type BlogPostScalarWhereInput = {
    AND?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
    OR?: BlogPostScalarWhereInput[]
    NOT?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
    id?: IntFilter<"BlogPost"> | number
    title?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    coverImageUrl?: StringNullableFilter<"BlogPost"> | string | null
    authorId?: IntFilter<"BlogPost"> | number
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    seoTitle?: StringNullableFilter<"BlogPost"> | string | null
    seoDescription?: StringNullableFilter<"BlogPost"> | string | null
    isPublished?: BoolFilter<"BlogPost"> | boolean
  }

  export type UserCreateWithoutEmployeeInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutEmployeeInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutEmployeeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeServiceCreateWithoutEmployeeInput = {
    service: ServiceCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeServiceUncheckedCreateWithoutEmployeeInput = {
    serviceId: number
  }

  export type EmployeeServiceCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    create: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeServiceCreateManyEmployeeInputEnvelope = {
    data: EmployeeServiceCreateManyEmployeeInput | EmployeeServiceCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type WorkScheduleCreateWithoutEmployeeInput = {
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
  }

  export type WorkScheduleUncheckedCreateWithoutEmployeeInput = {
    id?: number
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
  }

  export type WorkScheduleCreateOrConnectWithoutEmployeeInput = {
    where: WorkScheduleWhereUniqueInput
    create: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkScheduleCreateManyEmployeeInputEnvelope = {
    data: WorkScheduleCreateManyEmployeeInput | WorkScheduleCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type TimeBlockCreateWithoutEmployeeInput = {
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
  }

  export type TimeBlockUncheckedCreateWithoutEmployeeInput = {
    id?: number
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
  }

  export type TimeBlockCreateOrConnectWithoutEmployeeInput = {
    where: TimeBlockWhereUniqueInput
    create: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeBlockCreateManyEmployeeInputEnvelope = {
    data: TimeBlockCreateManyEmployeeInput | TimeBlockCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutEmployeeInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    service: ServiceCreateNestedOneWithoutAppointmentsInput
    consultation?: ConsultationRequestCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutEmployeeInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    consultation?: ConsultationRequestUncheckedCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutEmployeeInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput>
  }

  export type AppointmentCreateManyEmployeeInputEnvelope = {
    data: AppointmentCreateManyEmployeeInput | AppointmentCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationRequestCreateWithoutEmployeeInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    createdAt?: Date | string
    service: ServiceCreateNestedOneWithoutConsultationsInput
    scheduledAppointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationRequestUncheckedCreateWithoutEmployeeInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type ConsultationRequestCreateOrConnectWithoutEmployeeInput = {
    where: ConsultationRequestWhereUniqueInput
    create: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type ConsultationRequestCreateManyEmployeeInputEnvelope = {
    data: ConsultationRequestCreateManyEmployeeInput | ConsultationRequestCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEmployeeInput = {
    update: XOR<UserUpdateWithoutEmployeeInput, UserUncheckedUpdateWithoutEmployeeInput>
    create: XOR<UserCreateWithoutEmployeeInput, UserUncheckedCreateWithoutEmployeeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployeeInput, UserUncheckedUpdateWithoutEmployeeInput>
  }

  export type UserUpdateWithoutEmployeeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    update: XOR<EmployeeServiceUpdateWithoutEmployeeInput, EmployeeServiceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    data: XOR<EmployeeServiceUpdateWithoutEmployeeInput, EmployeeServiceUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeServiceScalarWhereInput
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeServiceScalarWhereInput = {
    AND?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
    OR?: EmployeeServiceScalarWhereInput[]
    NOT?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
    employeeId?: IntFilter<"EmployeeService"> | number
    serviceId?: IntFilter<"EmployeeService"> | number
  }

  export type WorkScheduleUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: WorkScheduleWhereUniqueInput
    update: XOR<WorkScheduleUpdateWithoutEmployeeInput, WorkScheduleUncheckedUpdateWithoutEmployeeInput>
    create: XOR<WorkScheduleCreateWithoutEmployeeInput, WorkScheduleUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkScheduleUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: WorkScheduleWhereUniqueInput
    data: XOR<WorkScheduleUpdateWithoutEmployeeInput, WorkScheduleUncheckedUpdateWithoutEmployeeInput>
  }

  export type WorkScheduleUpdateManyWithWhereWithoutEmployeeInput = {
    where: WorkScheduleScalarWhereInput
    data: XOR<WorkScheduleUpdateManyMutationInput, WorkScheduleUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type WorkScheduleScalarWhereInput = {
    AND?: WorkScheduleScalarWhereInput | WorkScheduleScalarWhereInput[]
    OR?: WorkScheduleScalarWhereInput[]
    NOT?: WorkScheduleScalarWhereInput | WorkScheduleScalarWhereInput[]
    id?: IntFilter<"WorkSchedule"> | number
    employeeId?: IntFilter<"WorkSchedule"> | number
    dayOfWeek?: IntFilter<"WorkSchedule"> | number
    startTime?: StringFilter<"WorkSchedule"> | string
    endTime?: StringFilter<"WorkSchedule"> | string
    isActive?: BoolFilter<"WorkSchedule"> | boolean
  }

  export type TimeBlockUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TimeBlockWhereUniqueInput
    update: XOR<TimeBlockUpdateWithoutEmployeeInput, TimeBlockUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TimeBlockCreateWithoutEmployeeInput, TimeBlockUncheckedCreateWithoutEmployeeInput>
  }

  export type TimeBlockUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TimeBlockWhereUniqueInput
    data: XOR<TimeBlockUpdateWithoutEmployeeInput, TimeBlockUncheckedUpdateWithoutEmployeeInput>
  }

  export type TimeBlockUpdateManyWithWhereWithoutEmployeeInput = {
    where: TimeBlockScalarWhereInput
    data: XOR<TimeBlockUpdateManyMutationInput, TimeBlockUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TimeBlockScalarWhereInput = {
    AND?: TimeBlockScalarWhereInput | TimeBlockScalarWhereInput[]
    OR?: TimeBlockScalarWhereInput[]
    NOT?: TimeBlockScalarWhereInput | TimeBlockScalarWhereInput[]
    id?: IntFilter<"TimeBlock"> | number
    employeeId?: IntFilter<"TimeBlock"> | number
    startDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    endDatetime?: DateTimeFilter<"TimeBlock"> | Date | string
    type?: EnumTimeBlockTypeFilter<"TimeBlock"> | $Enums.TimeBlockType
    reason?: StringNullableFilter<"TimeBlock"> | string | null
    createdAt?: DateTimeFilter<"TimeBlock"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutEmployeeInput, AppointmentUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AppointmentCreateWithoutEmployeeInput, AppointmentUncheckedCreateWithoutEmployeeInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutEmployeeInput, AppointmentUncheckedUpdateWithoutEmployeeInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutEmployeeInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: IntFilter<"Appointment"> | number
    clientName?: StringFilter<"Appointment"> | string
    clientEmail?: StringFilter<"Appointment"> | string
    clientPhone?: StringFilter<"Appointment"> | string
    employeeId?: IntFilter<"Appointment"> | number
    serviceId?: IntFilter<"Appointment"> | number
    startDatetime?: DateTimeFilter<"Appointment"> | Date | string
    endDatetime?: DateTimeFilter<"Appointment"> | Date | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    cancelToken?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type ConsultationRequestUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: ConsultationRequestWhereUniqueInput
    update: XOR<ConsultationRequestUpdateWithoutEmployeeInput, ConsultationRequestUncheckedUpdateWithoutEmployeeInput>
    create: XOR<ConsultationRequestCreateWithoutEmployeeInput, ConsultationRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type ConsultationRequestUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: ConsultationRequestWhereUniqueInput
    data: XOR<ConsultationRequestUpdateWithoutEmployeeInput, ConsultationRequestUncheckedUpdateWithoutEmployeeInput>
  }

  export type ConsultationRequestUpdateManyWithWhereWithoutEmployeeInput = {
    where: ConsultationRequestScalarWhereInput
    data: XOR<ConsultationRequestUpdateManyMutationInput, ConsultationRequestUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type ConsultationRequestScalarWhereInput = {
    AND?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
    OR?: ConsultationRequestScalarWhereInput[]
    NOT?: ConsultationRequestScalarWhereInput | ConsultationRequestScalarWhereInput[]
    id?: IntFilter<"ConsultationRequest"> | number
    clientName?: StringFilter<"ConsultationRequest"> | string
    clientEmail?: StringFilter<"ConsultationRequest"> | string
    clientPhone?: StringFilter<"ConsultationRequest"> | string
    serviceId?: IntFilter<"ConsultationRequest"> | number
    employeeId?: IntNullableFilter<"ConsultationRequest"> | number | null
    description?: StringFilter<"ConsultationRequest"> | string
    referenceImages?: JsonNullableFilter<"ConsultationRequest">
    status?: EnumConsultationStatusFilter<"ConsultationRequest"> | $Enums.ConsultationStatus
    scheduledAppointmentId?: IntNullableFilter<"ConsultationRequest"> | number | null
    createdAt?: DateTimeFilter<"ConsultationRequest"> | Date | string
  }

  export type EmployeeServiceCreateWithoutServiceInput = {
    employee: EmployeeCreateNestedOneWithoutServicesInput
  }

  export type EmployeeServiceUncheckedCreateWithoutServiceInput = {
    employeeId: number
  }

  export type EmployeeServiceCreateOrConnectWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    create: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput>
  }

  export type EmployeeServiceCreateManyServiceInputEnvelope = {
    data: EmployeeServiceCreateManyServiceInput | EmployeeServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutServiceInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAppointmentsInput
    consultation?: ConsultationRequestCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutServiceInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    consultation?: ConsultationRequestUncheckedCreateNestedOneWithoutScheduledAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentCreateManyServiceInputEnvelope = {
    data: AppointmentCreateManyServiceInput | AppointmentCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationRequestCreateWithoutServiceInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    createdAt?: Date | string
    employee?: EmployeeCreateNestedOneWithoutConsultationsInput
    scheduledAppointment?: AppointmentCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationRequestUncheckedCreateWithoutServiceInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId?: number | null
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type ConsultationRequestCreateOrConnectWithoutServiceInput = {
    where: ConsultationRequestWhereUniqueInput
    create: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput>
  }

  export type ConsultationRequestCreateManyServiceInputEnvelope = {
    data: ConsultationRequestCreateManyServiceInput | ConsultationRequestCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    update: XOR<EmployeeServiceUpdateWithoutServiceInput, EmployeeServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput>
  }

  export type EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    data: XOR<EmployeeServiceUpdateWithoutServiceInput, EmployeeServiceUncheckedUpdateWithoutServiceInput>
  }

  export type EmployeeServiceUpdateManyWithWhereWithoutServiceInput = {
    where: EmployeeServiceScalarWhereInput
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type AppointmentUpsertWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
    create: XOR<AppointmentCreateWithoutServiceInput, AppointmentUncheckedCreateWithoutServiceInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutServiceInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutServiceInput, AppointmentUncheckedUpdateWithoutServiceInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutServiceInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutServiceInput>
  }

  export type ConsultationRequestUpsertWithWhereUniqueWithoutServiceInput = {
    where: ConsultationRequestWhereUniqueInput
    update: XOR<ConsultationRequestUpdateWithoutServiceInput, ConsultationRequestUncheckedUpdateWithoutServiceInput>
    create: XOR<ConsultationRequestCreateWithoutServiceInput, ConsultationRequestUncheckedCreateWithoutServiceInput>
  }

  export type ConsultationRequestUpdateWithWhereUniqueWithoutServiceInput = {
    where: ConsultationRequestWhereUniqueInput
    data: XOR<ConsultationRequestUpdateWithoutServiceInput, ConsultationRequestUncheckedUpdateWithoutServiceInput>
  }

  export type ConsultationRequestUpdateManyWithWhereWithoutServiceInput = {
    where: ConsultationRequestScalarWhereInput
    data: XOR<ConsultationRequestUpdateManyMutationInput, ConsultationRequestUncheckedUpdateManyWithoutServiceInput>
  }

  export type EmployeeCreateWithoutServicesInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutServicesInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutServicesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutServicesInput, EmployeeUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCreateWithoutEmployeesInput = {
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutEmployeesInput = {
    id?: number
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutEmployeesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutEmployeesInput, ServiceUncheckedCreateWithoutEmployeesInput>
  }

  export type EmployeeUpsertWithoutServicesInput = {
    update: XOR<EmployeeUpdateWithoutServicesInput, EmployeeUncheckedUpdateWithoutServicesInput>
    create: XOR<EmployeeCreateWithoutServicesInput, EmployeeUncheckedCreateWithoutServicesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutServicesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutServicesInput, EmployeeUncheckedUpdateWithoutServicesInput>
  }

  export type EmployeeUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type ServiceUpsertWithoutEmployeesInput = {
    update: XOR<ServiceUpdateWithoutEmployeesInput, ServiceUncheckedUpdateWithoutEmployeesInput>
    create: XOR<ServiceCreateWithoutEmployeesInput, ServiceUncheckedCreateWithoutEmployeesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutEmployeesInput, ServiceUncheckedUpdateWithoutEmployeesInput>
  }

  export type ServiceUpdateWithoutEmployeesInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutEmployeesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type EmployeeCreateWithoutWorkSchedulesInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutWorkSchedulesInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutWorkSchedulesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutWorkSchedulesInput, EmployeeUncheckedCreateWithoutWorkSchedulesInput>
  }

  export type EmployeeUpsertWithoutWorkSchedulesInput = {
    update: XOR<EmployeeUpdateWithoutWorkSchedulesInput, EmployeeUncheckedUpdateWithoutWorkSchedulesInput>
    create: XOR<EmployeeCreateWithoutWorkSchedulesInput, EmployeeUncheckedCreateWithoutWorkSchedulesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutWorkSchedulesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutWorkSchedulesInput, EmployeeUncheckedUpdateWithoutWorkSchedulesInput>
  }

  export type EmployeeUpdateWithoutWorkSchedulesInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutWorkSchedulesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutTimeBlocksInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTimeBlocksInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTimeBlocksInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTimeBlocksInput, EmployeeUncheckedCreateWithoutTimeBlocksInput>
  }

  export type EmployeeUpsertWithoutTimeBlocksInput = {
    update: XOR<EmployeeUpdateWithoutTimeBlocksInput, EmployeeUncheckedUpdateWithoutTimeBlocksInput>
    create: XOR<EmployeeCreateWithoutTimeBlocksInput, EmployeeUncheckedCreateWithoutTimeBlocksInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutTimeBlocksInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutTimeBlocksInput, EmployeeUncheckedUpdateWithoutTimeBlocksInput>
  }

  export type EmployeeUpdateWithoutTimeBlocksInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTimeBlocksInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutAppointmentsInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAppointmentsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAppointmentsInput, EmployeeUncheckedCreateWithoutAppointmentsInput>
  }

  export type ServiceCreateWithoutAppointmentsInput = {
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutAppointmentsInput = {
    id?: number
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
    consultations?: ConsultationRequestUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutAppointmentsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
  }

  export type ConsultationRequestCreateWithoutScheduledAppointmentInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    createdAt?: Date | string
    service: ServiceCreateNestedOneWithoutConsultationsInput
    employee?: EmployeeCreateNestedOneWithoutConsultationsInput
  }

  export type ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    employeeId?: number | null
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    createdAt?: Date | string
  }

  export type ConsultationRequestCreateOrConnectWithoutScheduledAppointmentInput = {
    where: ConsultationRequestWhereUniqueInput
    create: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
  }

  export type EmployeeUpsertWithoutAppointmentsInput = {
    update: XOR<EmployeeUpdateWithoutAppointmentsInput, EmployeeUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<EmployeeCreateWithoutAppointmentsInput, EmployeeUncheckedCreateWithoutAppointmentsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAppointmentsInput, EmployeeUncheckedUpdateWithoutAppointmentsInput>
  }

  export type EmployeeUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type ServiceUpsertWithoutAppointmentsInput = {
    update: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ServiceCreateWithoutAppointmentsInput, ServiceUncheckedCreateWithoutAppointmentsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAppointmentsInput, ServiceUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ServiceUpdateWithoutAppointmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAppointmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
    consultations?: ConsultationRequestUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ConsultationRequestUpsertWithoutScheduledAppointmentInput = {
    update: XOR<ConsultationRequestUpdateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedUpdateWithoutScheduledAppointmentInput>
    create: XOR<ConsultationRequestCreateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedCreateWithoutScheduledAppointmentInput>
    where?: ConsultationRequestWhereInput
  }

  export type ConsultationRequestUpdateToOneWithWhereWithoutScheduledAppointmentInput = {
    where?: ConsultationRequestWhereInput
    data: XOR<ConsultationRequestUpdateWithoutScheduledAppointmentInput, ConsultationRequestUncheckedUpdateWithoutScheduledAppointmentInput>
  }

  export type ConsultationRequestUpdateWithoutScheduledAppointmentInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutConsultationsNestedInput
    employee?: EmployeeUpdateOneWithoutConsultationsNestedInput
  }

  export type ConsultationRequestUncheckedUpdateWithoutScheduledAppointmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateWithoutConsultationsInput = {
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceCreateNestedManyWithoutServiceInput
    appointments?: AppointmentCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutConsultationsInput = {
    id?: number
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    durationMin: number
    price: Decimal | DecimalJsLike | number | string
    requiresConsultation?: boolean
    isActive?: boolean
    employees?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutConsultationsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutConsultationsInput, ServiceUncheckedCreateWithoutConsultationsInput>
  }

  export type EmployeeCreateWithoutConsultationsInput = {
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeInput
    services?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutConsultationsInput = {
    id?: number
    userId: number
    name: string
    bio?: string | null
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    services?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
    workSchedules?: WorkScheduleUncheckedCreateNestedManyWithoutEmployeeInput
    timeBlocks?: TimeBlockUncheckedCreateNestedManyWithoutEmployeeInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutConsultationsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutConsultationsInput, EmployeeUncheckedCreateWithoutConsultationsInput>
  }

  export type AppointmentCreateWithoutConsultationInput = {
    clientName: string
    clientEmail: string
    clientPhone: string
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAppointmentsInput
    service: ServiceCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutConsultationInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    serviceId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutConsultationInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
  }

  export type ServiceUpsertWithoutConsultationsInput = {
    update: XOR<ServiceUpdateWithoutConsultationsInput, ServiceUncheckedUpdateWithoutConsultationsInput>
    create: XOR<ServiceCreateWithoutConsultationsInput, ServiceUncheckedCreateWithoutConsultationsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutConsultationsInput, ServiceUncheckedUpdateWithoutConsultationsInput>
  }

  export type ServiceUpdateWithoutConsultationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUpdateManyWithoutServiceNestedInput
    appointments?: AppointmentUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutConsultationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requiresConsultation?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    employees?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type EmployeeUpsertWithoutConsultationsInput = {
    update: XOR<EmployeeUpdateWithoutConsultationsInput, EmployeeUncheckedUpdateWithoutConsultationsInput>
    create: XOR<EmployeeCreateWithoutConsultationsInput, EmployeeUncheckedCreateWithoutConsultationsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutConsultationsInput, EmployeeUncheckedUpdateWithoutConsultationsInput>
  }

  export type EmployeeUpdateWithoutConsultationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeNestedInput
    services?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutConsultationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
    workSchedules?: WorkScheduleUncheckedUpdateManyWithoutEmployeeNestedInput
    timeBlocks?: TimeBlockUncheckedUpdateManyWithoutEmployeeNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type AppointmentUpsertWithoutConsultationInput = {
    update: XOR<AppointmentUpdateWithoutConsultationInput, AppointmentUncheckedUpdateWithoutConsultationInput>
    create: XOR<AppointmentCreateWithoutConsultationInput, AppointmentUncheckedCreateWithoutConsultationInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutConsultationInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutConsultationInput, AppointmentUncheckedUpdateWithoutConsultationInput>
  }

  export type AppointmentUpdateWithoutConsultationInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAppointmentsNestedInput
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutConsultationInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutBlogPostsInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    employee?: EmployeeCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBlogPostsInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    employee?: EmployeeUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBlogPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlogPostsInput, UserUncheckedCreateWithoutBlogPostsInput>
  }

  export type UserUpsertWithoutBlogPostsInput = {
    update: XOR<UserUpdateWithoutBlogPostsInput, UserUncheckedUpdateWithoutBlogPostsInput>
    create: XOR<UserCreateWithoutBlogPostsInput, UserUncheckedCreateWithoutBlogPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlogPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlogPostsInput, UserUncheckedUpdateWithoutBlogPostsInput>
  }

  export type UserUpdateWithoutBlogPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBlogPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type BlogPostCreateManyAuthorInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    coverImageUrl?: string | null
    publishedAt?: Date | string | null
    seoTitle?: string | null
    seoDescription?: string | null
    isPublished?: boolean
  }

  export type BlogPostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BlogPostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BlogPostUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeServiceCreateManyEmployeeInput = {
    serviceId: number
  }

  export type WorkScheduleCreateManyEmployeeInput = {
    id?: number
    dayOfWeek: number
    startTime: string
    endTime: string
    isActive?: boolean
  }

  export type TimeBlockCreateManyEmployeeInput = {
    id?: number
    startDatetime: Date | string
    endDatetime: Date | string
    type: $Enums.TimeBlockType
    reason?: string | null
    createdAt?: Date | string
  }

  export type AppointmentCreateManyEmployeeInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
  }

  export type ConsultationRequestCreateManyEmployeeInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    serviceId: number
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateWithoutEmployeeInput = {
    service?: ServiceUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateWithoutEmployeeInput = {
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutEmployeeInput = {
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type WorkScheduleUpdateWithoutEmployeeInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkScheduleUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkScheduleUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimeBlockUpdateWithoutEmployeeInput = {
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeBlockUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeBlockUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTimeBlockTypeFieldUpdateOperationsInput | $Enums.TimeBlockType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutEmployeeInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutAppointmentsNestedInput
    consultation?: ConsultationRequestUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationRequestUncheckedUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestUpdateWithoutEmployeeInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutConsultationsNestedInput
    scheduledAppointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationRequestUncheckedUpdateWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestUncheckedUpdateManyWithoutEmployeeInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceCreateManyServiceInput = {
    employeeId: number
  }

  export type AppointmentCreateManyServiceInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId: number
    startDatetime: Date | string
    endDatetime: Date | string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    cancelToken?: string | null
    createdAt?: Date | string
  }

  export type ConsultationRequestCreateManyServiceInput = {
    id?: number
    clientName: string
    clientEmail: string
    clientPhone: string
    employeeId?: number | null
    description: string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ConsultationStatus
    scheduledAppointmentId?: number | null
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateWithoutServiceInput = {
    employee?: EmployeeUpdateOneRequiredWithoutServicesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateWithoutServiceInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutServiceInput = {
    employeeId?: IntFieldUpdateOperationsInput | number
  }

  export type AppointmentUpdateWithoutServiceInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAppointmentsNestedInput
    consultation?: ConsultationRequestUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultation?: ConsultationRequestUncheckedUpdateOneWithoutScheduledAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: IntFieldUpdateOperationsInput | number
    startDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    endDatetime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestUpdateWithoutServiceInput = {
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneWithoutConsultationsNestedInput
    scheduledAppointment?: AppointmentUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationRequestUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationRequestUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientName?: StringFieldUpdateOperationsInput | string
    clientEmail?: StringFieldUpdateOperationsInput | string
    clientPhone?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    referenceImages?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus
    scheduledAppointmentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeCountOutputTypeDefaultArgs instead
     */
    export type EmployeeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeDefaultArgs instead
     */
    export type EmployeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeServiceDefaultArgs instead
     */
    export type EmployeeServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkScheduleDefaultArgs instead
     */
    export type WorkScheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkScheduleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TimeBlockDefaultArgs instead
     */
    export type TimeBlockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TimeBlockDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppointmentDefaultArgs instead
     */
    export type AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConsultationRequestDefaultArgs instead
     */
    export type ConsultationRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConsultationRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlogPostDefaultArgs instead
     */
    export type BlogPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlogPostDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}