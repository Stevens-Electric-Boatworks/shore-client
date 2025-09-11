
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DataReading
 * 
 */
export type DataReading = $Result.DefaultSelection<Prisma.$DataReadingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DataReadings
 * const dataReadings = await prisma.dataReading.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more DataReadings
   * const dataReadings = await prisma.dataReading.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.dataReading`: Exposes CRUD operations for the **DataReading** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataReadings
    * const dataReadings = await prisma.dataReading.findMany()
    * ```
    */
  get dataReading(): Prisma.DataReadingDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    DataReading: 'DataReading'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "dataReading"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DataReading: {
        payload: Prisma.$DataReadingPayload<ExtArgs>
        fields: Prisma.DataReadingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataReadingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataReadingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          findFirst: {
            args: Prisma.DataReadingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataReadingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          findMany: {
            args: Prisma.DataReadingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>[]
          }
          create: {
            args: Prisma.DataReadingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          createMany: {
            args: Prisma.DataReadingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataReadingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>[]
          }
          delete: {
            args: Prisma.DataReadingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          update: {
            args: Prisma.DataReadingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          deleteMany: {
            args: Prisma.DataReadingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataReadingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataReadingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>[]
          }
          upsert: {
            args: Prisma.DataReadingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataReadingPayload>
          }
          aggregate: {
            args: Prisma.DataReadingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataReading>
          }
          groupBy: {
            args: Prisma.DataReadingGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataReadingGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataReadingCountArgs<ExtArgs>
            result: $Utils.Optional<DataReadingCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    dataReading?: DataReadingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Models
   */

  /**
   * Model DataReading
   */

  export type AggregateDataReading = {
    _count: DataReadingCountAggregateOutputType | null
    _avg: DataReadingAvgAggregateOutputType | null
    _sum: DataReadingSumAggregateOutputType | null
    _min: DataReadingMinAggregateOutputType | null
    _max: DataReadingMaxAggregateOutputType | null
  }

  export type DataReadingAvgAggregateOutputType = {
    id: number | null
    voltage: number | null
    throttle_mv: number | null
    throttle_percentage: number | null
    rpm: number | null
    torque: number | null
    motor_temp: number | null
    current: number | null
    power: number | null
    pitch: number | null
    yaw: number | null
    roll: number | null
    ax: number | null
    ay: number | null
    az: number | null
    heading: number | null
  }

  export type DataReadingSumAggregateOutputType = {
    id: number | null
    voltage: number | null
    throttle_mv: number | null
    throttle_percentage: number | null
    rpm: number | null
    torque: number | null
    motor_temp: number | null
    current: number | null
    power: number | null
    pitch: number | null
    yaw: number | null
    roll: number | null
    ax: number | null
    ay: number | null
    az: number | null
    heading: number | null
  }

  export type DataReadingMinAggregateOutputType = {
    id: number | null
    voltage: number | null
    throttle_mv: number | null
    throttle_percentage: number | null
    rpm: number | null
    torque: number | null
    motor_temp: number | null
    current: number | null
    power: number | null
    pitch: number | null
    yaw: number | null
    roll: number | null
    ax: number | null
    ay: number | null
    az: number | null
    heading: number | null
  }

  export type DataReadingMaxAggregateOutputType = {
    id: number | null
    voltage: number | null
    throttle_mv: number | null
    throttle_percentage: number | null
    rpm: number | null
    torque: number | null
    motor_temp: number | null
    current: number | null
    power: number | null
    pitch: number | null
    yaw: number | null
    roll: number | null
    ax: number | null
    ay: number | null
    az: number | null
    heading: number | null
  }

  export type DataReadingCountAggregateOutputType = {
    id: number
    voltage: number
    throttle_mv: number
    throttle_percentage: number
    rpm: number
    torque: number
    motor_temp: number
    current: number
    power: number
    pitch: number
    yaw: number
    roll: number
    ax: number
    ay: number
    az: number
    heading: number
    _all: number
  }


  export type DataReadingAvgAggregateInputType = {
    id?: true
    voltage?: true
    throttle_mv?: true
    throttle_percentage?: true
    rpm?: true
    torque?: true
    motor_temp?: true
    current?: true
    power?: true
    pitch?: true
    yaw?: true
    roll?: true
    ax?: true
    ay?: true
    az?: true
    heading?: true
  }

  export type DataReadingSumAggregateInputType = {
    id?: true
    voltage?: true
    throttle_mv?: true
    throttle_percentage?: true
    rpm?: true
    torque?: true
    motor_temp?: true
    current?: true
    power?: true
    pitch?: true
    yaw?: true
    roll?: true
    ax?: true
    ay?: true
    az?: true
    heading?: true
  }

  export type DataReadingMinAggregateInputType = {
    id?: true
    voltage?: true
    throttle_mv?: true
    throttle_percentage?: true
    rpm?: true
    torque?: true
    motor_temp?: true
    current?: true
    power?: true
    pitch?: true
    yaw?: true
    roll?: true
    ax?: true
    ay?: true
    az?: true
    heading?: true
  }

  export type DataReadingMaxAggregateInputType = {
    id?: true
    voltage?: true
    throttle_mv?: true
    throttle_percentage?: true
    rpm?: true
    torque?: true
    motor_temp?: true
    current?: true
    power?: true
    pitch?: true
    yaw?: true
    roll?: true
    ax?: true
    ay?: true
    az?: true
    heading?: true
  }

  export type DataReadingCountAggregateInputType = {
    id?: true
    voltage?: true
    throttle_mv?: true
    throttle_percentage?: true
    rpm?: true
    torque?: true
    motor_temp?: true
    current?: true
    power?: true
    pitch?: true
    yaw?: true
    roll?: true
    ax?: true
    ay?: true
    az?: true
    heading?: true
    _all?: true
  }

  export type DataReadingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataReading to aggregate.
     */
    where?: DataReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataReadings to fetch.
     */
    orderBy?: DataReadingOrderByWithRelationInput | DataReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataReadings
    **/
    _count?: true | DataReadingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataReadingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataReadingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataReadingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataReadingMaxAggregateInputType
  }

  export type GetDataReadingAggregateType<T extends DataReadingAggregateArgs> = {
        [P in keyof T & keyof AggregateDataReading]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataReading[P]>
      : GetScalarType<T[P], AggregateDataReading[P]>
  }




  export type DataReadingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataReadingWhereInput
    orderBy?: DataReadingOrderByWithAggregationInput | DataReadingOrderByWithAggregationInput[]
    by: DataReadingScalarFieldEnum[] | DataReadingScalarFieldEnum
    having?: DataReadingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataReadingCountAggregateInputType | true
    _avg?: DataReadingAvgAggregateInputType
    _sum?: DataReadingSumAggregateInputType
    _min?: DataReadingMinAggregateInputType
    _max?: DataReadingMaxAggregateInputType
  }

  export type DataReadingGroupByOutputType = {
    id: number
    voltage: number
    throttle_mv: number
    throttle_percentage: number
    rpm: number
    torque: number
    motor_temp: number
    current: number
    power: number
    pitch: number
    yaw: number
    roll: number
    ax: number
    ay: number
    az: number
    heading: number
    _count: DataReadingCountAggregateOutputType | null
    _avg: DataReadingAvgAggregateOutputType | null
    _sum: DataReadingSumAggregateOutputType | null
    _min: DataReadingMinAggregateOutputType | null
    _max: DataReadingMaxAggregateOutputType | null
  }

  type GetDataReadingGroupByPayload<T extends DataReadingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataReadingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataReadingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataReadingGroupByOutputType[P]>
            : GetScalarType<T[P], DataReadingGroupByOutputType[P]>
        }
      >
    >


  export type DataReadingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voltage?: boolean
    throttle_mv?: boolean
    throttle_percentage?: boolean
    rpm?: boolean
    torque?: boolean
    motor_temp?: boolean
    current?: boolean
    power?: boolean
    pitch?: boolean
    yaw?: boolean
    roll?: boolean
    ax?: boolean
    ay?: boolean
    az?: boolean
    heading?: boolean
  }, ExtArgs["result"]["dataReading"]>

  export type DataReadingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voltage?: boolean
    throttle_mv?: boolean
    throttle_percentage?: boolean
    rpm?: boolean
    torque?: boolean
    motor_temp?: boolean
    current?: boolean
    power?: boolean
    pitch?: boolean
    yaw?: boolean
    roll?: boolean
    ax?: boolean
    ay?: boolean
    az?: boolean
    heading?: boolean
  }, ExtArgs["result"]["dataReading"]>

  export type DataReadingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voltage?: boolean
    throttle_mv?: boolean
    throttle_percentage?: boolean
    rpm?: boolean
    torque?: boolean
    motor_temp?: boolean
    current?: boolean
    power?: boolean
    pitch?: boolean
    yaw?: boolean
    roll?: boolean
    ax?: boolean
    ay?: boolean
    az?: boolean
    heading?: boolean
  }, ExtArgs["result"]["dataReading"]>

  export type DataReadingSelectScalar = {
    id?: boolean
    voltage?: boolean
    throttle_mv?: boolean
    throttle_percentage?: boolean
    rpm?: boolean
    torque?: boolean
    motor_temp?: boolean
    current?: boolean
    power?: boolean
    pitch?: boolean
    yaw?: boolean
    roll?: boolean
    ax?: boolean
    ay?: boolean
    az?: boolean
    heading?: boolean
  }

  export type DataReadingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "voltage" | "throttle_mv" | "throttle_percentage" | "rpm" | "torque" | "motor_temp" | "current" | "power" | "pitch" | "yaw" | "roll" | "ax" | "ay" | "az" | "heading", ExtArgs["result"]["dataReading"]>

  export type $DataReadingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataReading"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      voltage: number
      throttle_mv: number
      throttle_percentage: number
      rpm: number
      torque: number
      motor_temp: number
      current: number
      power: number
      pitch: number
      yaw: number
      roll: number
      ax: number
      ay: number
      az: number
      heading: number
    }, ExtArgs["result"]["dataReading"]>
    composites: {}
  }

  type DataReadingGetPayload<S extends boolean | null | undefined | DataReadingDefaultArgs> = $Result.GetResult<Prisma.$DataReadingPayload, S>

  type DataReadingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataReadingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataReadingCountAggregateInputType | true
    }

  export interface DataReadingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataReading'], meta: { name: 'DataReading' } }
    /**
     * Find zero or one DataReading that matches the filter.
     * @param {DataReadingFindUniqueArgs} args - Arguments to find a DataReading
     * @example
     * // Get one DataReading
     * const dataReading = await prisma.dataReading.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataReadingFindUniqueArgs>(args: SelectSubset<T, DataReadingFindUniqueArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataReading that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataReadingFindUniqueOrThrowArgs} args - Arguments to find a DataReading
     * @example
     * // Get one DataReading
     * const dataReading = await prisma.dataReading.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataReadingFindUniqueOrThrowArgs>(args: SelectSubset<T, DataReadingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataReading that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingFindFirstArgs} args - Arguments to find a DataReading
     * @example
     * // Get one DataReading
     * const dataReading = await prisma.dataReading.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataReadingFindFirstArgs>(args?: SelectSubset<T, DataReadingFindFirstArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataReading that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingFindFirstOrThrowArgs} args - Arguments to find a DataReading
     * @example
     * // Get one DataReading
     * const dataReading = await prisma.dataReading.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataReadingFindFirstOrThrowArgs>(args?: SelectSubset<T, DataReadingFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataReadings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataReadings
     * const dataReadings = await prisma.dataReading.findMany()
     * 
     * // Get first 10 DataReadings
     * const dataReadings = await prisma.dataReading.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dataReadingWithIdOnly = await prisma.dataReading.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DataReadingFindManyArgs>(args?: SelectSubset<T, DataReadingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataReading.
     * @param {DataReadingCreateArgs} args - Arguments to create a DataReading.
     * @example
     * // Create one DataReading
     * const DataReading = await prisma.dataReading.create({
     *   data: {
     *     // ... data to create a DataReading
     *   }
     * })
     * 
     */
    create<T extends DataReadingCreateArgs>(args: SelectSubset<T, DataReadingCreateArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataReadings.
     * @param {DataReadingCreateManyArgs} args - Arguments to create many DataReadings.
     * @example
     * // Create many DataReadings
     * const dataReading = await prisma.dataReading.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataReadingCreateManyArgs>(args?: SelectSubset<T, DataReadingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataReadings and returns the data saved in the database.
     * @param {DataReadingCreateManyAndReturnArgs} args - Arguments to create many DataReadings.
     * @example
     * // Create many DataReadings
     * const dataReading = await prisma.dataReading.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataReadings and only return the `id`
     * const dataReadingWithIdOnly = await prisma.dataReading.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataReadingCreateManyAndReturnArgs>(args?: SelectSubset<T, DataReadingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataReading.
     * @param {DataReadingDeleteArgs} args - Arguments to delete one DataReading.
     * @example
     * // Delete one DataReading
     * const DataReading = await prisma.dataReading.delete({
     *   where: {
     *     // ... filter to delete one DataReading
     *   }
     * })
     * 
     */
    delete<T extends DataReadingDeleteArgs>(args: SelectSubset<T, DataReadingDeleteArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataReading.
     * @param {DataReadingUpdateArgs} args - Arguments to update one DataReading.
     * @example
     * // Update one DataReading
     * const dataReading = await prisma.dataReading.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataReadingUpdateArgs>(args: SelectSubset<T, DataReadingUpdateArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataReadings.
     * @param {DataReadingDeleteManyArgs} args - Arguments to filter DataReadings to delete.
     * @example
     * // Delete a few DataReadings
     * const { count } = await prisma.dataReading.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataReadingDeleteManyArgs>(args?: SelectSubset<T, DataReadingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataReadings
     * const dataReading = await prisma.dataReading.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataReadingUpdateManyArgs>(args: SelectSubset<T, DataReadingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataReadings and returns the data updated in the database.
     * @param {DataReadingUpdateManyAndReturnArgs} args - Arguments to update many DataReadings.
     * @example
     * // Update many DataReadings
     * const dataReading = await prisma.dataReading.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataReadings and only return the `id`
     * const dataReadingWithIdOnly = await prisma.dataReading.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataReadingUpdateManyAndReturnArgs>(args: SelectSubset<T, DataReadingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataReading.
     * @param {DataReadingUpsertArgs} args - Arguments to update or create a DataReading.
     * @example
     * // Update or create a DataReading
     * const dataReading = await prisma.dataReading.upsert({
     *   create: {
     *     // ... data to create a DataReading
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataReading we want to update
     *   }
     * })
     */
    upsert<T extends DataReadingUpsertArgs>(args: SelectSubset<T, DataReadingUpsertArgs<ExtArgs>>): Prisma__DataReadingClient<$Result.GetResult<Prisma.$DataReadingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingCountArgs} args - Arguments to filter DataReadings to count.
     * @example
     * // Count the number of DataReadings
     * const count = await prisma.dataReading.count({
     *   where: {
     *     // ... the filter for the DataReadings we want to count
     *   }
     * })
    **/
    count<T extends DataReadingCountArgs>(
      args?: Subset<T, DataReadingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataReadingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DataReadingAggregateArgs>(args: Subset<T, DataReadingAggregateArgs>): Prisma.PrismaPromise<GetDataReadingAggregateType<T>>

    /**
     * Group by DataReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataReadingGroupByArgs} args - Group by arguments.
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
      T extends DataReadingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataReadingGroupByArgs['orderBy'] }
        : { orderBy?: DataReadingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DataReadingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataReadingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataReading model
   */
  readonly fields: DataReadingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataReading.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataReadingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DataReading model
   */
  interface DataReadingFieldRefs {
    readonly id: FieldRef<"DataReading", 'Int'>
    readonly voltage: FieldRef<"DataReading", 'Float'>
    readonly throttle_mv: FieldRef<"DataReading", 'Float'>
    readonly throttle_percentage: FieldRef<"DataReading", 'Float'>
    readonly rpm: FieldRef<"DataReading", 'Int'>
    readonly torque: FieldRef<"DataReading", 'Int'>
    readonly motor_temp: FieldRef<"DataReading", 'Float'>
    readonly current: FieldRef<"DataReading", 'Float'>
    readonly power: FieldRef<"DataReading", 'Int'>
    readonly pitch: FieldRef<"DataReading", 'Float'>
    readonly yaw: FieldRef<"DataReading", 'Float'>
    readonly roll: FieldRef<"DataReading", 'Float'>
    readonly ax: FieldRef<"DataReading", 'Float'>
    readonly ay: FieldRef<"DataReading", 'Float'>
    readonly az: FieldRef<"DataReading", 'Float'>
    readonly heading: FieldRef<"DataReading", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DataReading findUnique
   */
  export type DataReadingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter, which DataReading to fetch.
     */
    where: DataReadingWhereUniqueInput
  }

  /**
   * DataReading findUniqueOrThrow
   */
  export type DataReadingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter, which DataReading to fetch.
     */
    where: DataReadingWhereUniqueInput
  }

  /**
   * DataReading findFirst
   */
  export type DataReadingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter, which DataReading to fetch.
     */
    where?: DataReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataReadings to fetch.
     */
    orderBy?: DataReadingOrderByWithRelationInput | DataReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataReadings.
     */
    cursor?: DataReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataReadings.
     */
    distinct?: DataReadingScalarFieldEnum | DataReadingScalarFieldEnum[]
  }

  /**
   * DataReading findFirstOrThrow
   */
  export type DataReadingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter, which DataReading to fetch.
     */
    where?: DataReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataReadings to fetch.
     */
    orderBy?: DataReadingOrderByWithRelationInput | DataReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataReadings.
     */
    cursor?: DataReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataReadings.
     */
    distinct?: DataReadingScalarFieldEnum | DataReadingScalarFieldEnum[]
  }

  /**
   * DataReading findMany
   */
  export type DataReadingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter, which DataReadings to fetch.
     */
    where?: DataReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataReadings to fetch.
     */
    orderBy?: DataReadingOrderByWithRelationInput | DataReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataReadings.
     */
    cursor?: DataReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataReadings.
     */
    skip?: number
    distinct?: DataReadingScalarFieldEnum | DataReadingScalarFieldEnum[]
  }

  /**
   * DataReading create
   */
  export type DataReadingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * The data needed to create a DataReading.
     */
    data: XOR<DataReadingCreateInput, DataReadingUncheckedCreateInput>
  }

  /**
   * DataReading createMany
   */
  export type DataReadingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataReadings.
     */
    data: DataReadingCreateManyInput | DataReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataReading createManyAndReturn
   */
  export type DataReadingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * The data used to create many DataReadings.
     */
    data: DataReadingCreateManyInput | DataReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataReading update
   */
  export type DataReadingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * The data needed to update a DataReading.
     */
    data: XOR<DataReadingUpdateInput, DataReadingUncheckedUpdateInput>
    /**
     * Choose, which DataReading to update.
     */
    where: DataReadingWhereUniqueInput
  }

  /**
   * DataReading updateMany
   */
  export type DataReadingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataReadings.
     */
    data: XOR<DataReadingUpdateManyMutationInput, DataReadingUncheckedUpdateManyInput>
    /**
     * Filter which DataReadings to update
     */
    where?: DataReadingWhereInput
    /**
     * Limit how many DataReadings to update.
     */
    limit?: number
  }

  /**
   * DataReading updateManyAndReturn
   */
  export type DataReadingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * The data used to update DataReadings.
     */
    data: XOR<DataReadingUpdateManyMutationInput, DataReadingUncheckedUpdateManyInput>
    /**
     * Filter which DataReadings to update
     */
    where?: DataReadingWhereInput
    /**
     * Limit how many DataReadings to update.
     */
    limit?: number
  }

  /**
   * DataReading upsert
   */
  export type DataReadingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * The filter to search for the DataReading to update in case it exists.
     */
    where: DataReadingWhereUniqueInput
    /**
     * In case the DataReading found by the `where` argument doesn't exist, create a new DataReading with this data.
     */
    create: XOR<DataReadingCreateInput, DataReadingUncheckedCreateInput>
    /**
     * In case the DataReading was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataReadingUpdateInput, DataReadingUncheckedUpdateInput>
  }

  /**
   * DataReading delete
   */
  export type DataReadingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
    /**
     * Filter which DataReading to delete.
     */
    where: DataReadingWhereUniqueInput
  }

  /**
   * DataReading deleteMany
   */
  export type DataReadingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataReadings to delete
     */
    where?: DataReadingWhereInput
    /**
     * Limit how many DataReadings to delete.
     */
    limit?: number
  }

  /**
   * DataReading without action
   */
  export type DataReadingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataReading
     */
    select?: DataReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataReading
     */
    omit?: DataReadingOmit<ExtArgs> | null
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


  export const DataReadingScalarFieldEnum: {
    id: 'id',
    voltage: 'voltage',
    throttle_mv: 'throttle_mv',
    throttle_percentage: 'throttle_percentage',
    rpm: 'rpm',
    torque: 'torque',
    motor_temp: 'motor_temp',
    current: 'current',
    power: 'power',
    pitch: 'pitch',
    yaw: 'yaw',
    roll: 'roll',
    ax: 'ax',
    ay: 'ay',
    az: 'az',
    heading: 'heading'
  };

  export type DataReadingScalarFieldEnum = (typeof DataReadingScalarFieldEnum)[keyof typeof DataReadingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DataReadingWhereInput = {
    AND?: DataReadingWhereInput | DataReadingWhereInput[]
    OR?: DataReadingWhereInput[]
    NOT?: DataReadingWhereInput | DataReadingWhereInput[]
    id?: IntFilter<"DataReading"> | number
    voltage?: FloatFilter<"DataReading"> | number
    throttle_mv?: FloatFilter<"DataReading"> | number
    throttle_percentage?: FloatFilter<"DataReading"> | number
    rpm?: IntFilter<"DataReading"> | number
    torque?: IntFilter<"DataReading"> | number
    motor_temp?: FloatFilter<"DataReading"> | number
    current?: FloatFilter<"DataReading"> | number
    power?: IntFilter<"DataReading"> | number
    pitch?: FloatFilter<"DataReading"> | number
    yaw?: FloatFilter<"DataReading"> | number
    roll?: FloatFilter<"DataReading"> | number
    ax?: FloatFilter<"DataReading"> | number
    ay?: FloatFilter<"DataReading"> | number
    az?: FloatFilter<"DataReading"> | number
    heading?: IntFilter<"DataReading"> | number
  }

  export type DataReadingOrderByWithRelationInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type DataReadingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DataReadingWhereInput | DataReadingWhereInput[]
    OR?: DataReadingWhereInput[]
    NOT?: DataReadingWhereInput | DataReadingWhereInput[]
    voltage?: FloatFilter<"DataReading"> | number
    throttle_mv?: FloatFilter<"DataReading"> | number
    throttle_percentage?: FloatFilter<"DataReading"> | number
    rpm?: IntFilter<"DataReading"> | number
    torque?: IntFilter<"DataReading"> | number
    motor_temp?: FloatFilter<"DataReading"> | number
    current?: FloatFilter<"DataReading"> | number
    power?: IntFilter<"DataReading"> | number
    pitch?: FloatFilter<"DataReading"> | number
    yaw?: FloatFilter<"DataReading"> | number
    roll?: FloatFilter<"DataReading"> | number
    ax?: FloatFilter<"DataReading"> | number
    ay?: FloatFilter<"DataReading"> | number
    az?: FloatFilter<"DataReading"> | number
    heading?: IntFilter<"DataReading"> | number
  }, "id">

  export type DataReadingOrderByWithAggregationInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
    _count?: DataReadingCountOrderByAggregateInput
    _avg?: DataReadingAvgOrderByAggregateInput
    _max?: DataReadingMaxOrderByAggregateInput
    _min?: DataReadingMinOrderByAggregateInput
    _sum?: DataReadingSumOrderByAggregateInput
  }

  export type DataReadingScalarWhereWithAggregatesInput = {
    AND?: DataReadingScalarWhereWithAggregatesInput | DataReadingScalarWhereWithAggregatesInput[]
    OR?: DataReadingScalarWhereWithAggregatesInput[]
    NOT?: DataReadingScalarWhereWithAggregatesInput | DataReadingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DataReading"> | number
    voltage?: FloatWithAggregatesFilter<"DataReading"> | number
    throttle_mv?: FloatWithAggregatesFilter<"DataReading"> | number
    throttle_percentage?: FloatWithAggregatesFilter<"DataReading"> | number
    rpm?: IntWithAggregatesFilter<"DataReading"> | number
    torque?: IntWithAggregatesFilter<"DataReading"> | number
    motor_temp?: FloatWithAggregatesFilter<"DataReading"> | number
    current?: FloatWithAggregatesFilter<"DataReading"> | number
    power?: IntWithAggregatesFilter<"DataReading"> | number
    pitch?: FloatWithAggregatesFilter<"DataReading"> | number
    yaw?: FloatWithAggregatesFilter<"DataReading"> | number
    roll?: FloatWithAggregatesFilter<"DataReading"> | number
    ax?: FloatWithAggregatesFilter<"DataReading"> | number
    ay?: FloatWithAggregatesFilter<"DataReading"> | number
    az?: FloatWithAggregatesFilter<"DataReading"> | number
    heading?: IntWithAggregatesFilter<"DataReading"> | number
  }

  export type DataReadingCreateInput = {
    voltage: number
    throttle_mv: number
    throttle_percentage: number
    rpm: number
    torque: number
    motor_temp: number
    current: number
    power: number
    pitch: number
    yaw: number
    roll: number
    ax: number
    ay: number
    az: number
    heading: number
  }

  export type DataReadingUncheckedCreateInput = {
    id?: number
    voltage: number
    throttle_mv: number
    throttle_percentage: number
    rpm: number
    torque: number
    motor_temp: number
    current: number
    power: number
    pitch: number
    yaw: number
    roll: number
    ax: number
    ay: number
    az: number
    heading: number
  }

  export type DataReadingUpdateInput = {
    voltage?: FloatFieldUpdateOperationsInput | number
    throttle_mv?: FloatFieldUpdateOperationsInput | number
    throttle_percentage?: FloatFieldUpdateOperationsInput | number
    rpm?: IntFieldUpdateOperationsInput | number
    torque?: IntFieldUpdateOperationsInput | number
    motor_temp?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    yaw?: FloatFieldUpdateOperationsInput | number
    roll?: FloatFieldUpdateOperationsInput | number
    ax?: FloatFieldUpdateOperationsInput | number
    ay?: FloatFieldUpdateOperationsInput | number
    az?: FloatFieldUpdateOperationsInput | number
    heading?: IntFieldUpdateOperationsInput | number
  }

  export type DataReadingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    voltage?: FloatFieldUpdateOperationsInput | number
    throttle_mv?: FloatFieldUpdateOperationsInput | number
    throttle_percentage?: FloatFieldUpdateOperationsInput | number
    rpm?: IntFieldUpdateOperationsInput | number
    torque?: IntFieldUpdateOperationsInput | number
    motor_temp?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    yaw?: FloatFieldUpdateOperationsInput | number
    roll?: FloatFieldUpdateOperationsInput | number
    ax?: FloatFieldUpdateOperationsInput | number
    ay?: FloatFieldUpdateOperationsInput | number
    az?: FloatFieldUpdateOperationsInput | number
    heading?: IntFieldUpdateOperationsInput | number
  }

  export type DataReadingCreateManyInput = {
    id?: number
    voltage: number
    throttle_mv: number
    throttle_percentage: number
    rpm: number
    torque: number
    motor_temp: number
    current: number
    power: number
    pitch: number
    yaw: number
    roll: number
    ax: number
    ay: number
    az: number
    heading: number
  }

  export type DataReadingUpdateManyMutationInput = {
    voltage?: FloatFieldUpdateOperationsInput | number
    throttle_mv?: FloatFieldUpdateOperationsInput | number
    throttle_percentage?: FloatFieldUpdateOperationsInput | number
    rpm?: IntFieldUpdateOperationsInput | number
    torque?: IntFieldUpdateOperationsInput | number
    motor_temp?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    yaw?: FloatFieldUpdateOperationsInput | number
    roll?: FloatFieldUpdateOperationsInput | number
    ax?: FloatFieldUpdateOperationsInput | number
    ay?: FloatFieldUpdateOperationsInput | number
    az?: FloatFieldUpdateOperationsInput | number
    heading?: IntFieldUpdateOperationsInput | number
  }

  export type DataReadingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    voltage?: FloatFieldUpdateOperationsInput | number
    throttle_mv?: FloatFieldUpdateOperationsInput | number
    throttle_percentage?: FloatFieldUpdateOperationsInput | number
    rpm?: IntFieldUpdateOperationsInput | number
    torque?: IntFieldUpdateOperationsInput | number
    motor_temp?: FloatFieldUpdateOperationsInput | number
    current?: FloatFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    yaw?: FloatFieldUpdateOperationsInput | number
    roll?: FloatFieldUpdateOperationsInput | number
    ax?: FloatFieldUpdateOperationsInput | number
    ay?: FloatFieldUpdateOperationsInput | number
    az?: FloatFieldUpdateOperationsInput | number
    heading?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DataReadingCountOrderByAggregateInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type DataReadingAvgOrderByAggregateInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type DataReadingMaxOrderByAggregateInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type DataReadingMinOrderByAggregateInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type DataReadingSumOrderByAggregateInput = {
    id?: SortOrder
    voltage?: SortOrder
    throttle_mv?: SortOrder
    throttle_percentage?: SortOrder
    rpm?: SortOrder
    torque?: SortOrder
    motor_temp?: SortOrder
    current?: SortOrder
    power?: SortOrder
    pitch?: SortOrder
    yaw?: SortOrder
    roll?: SortOrder
    ax?: SortOrder
    ay?: SortOrder
    az?: SortOrder
    heading?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



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