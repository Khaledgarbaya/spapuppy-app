
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
 * Model Puppy
 * 
 */
export type Puppy = $Result.DefaultSelection<Prisma.$PuppyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Puppies
 * const puppies = await prisma.puppy.findMany()
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
   * // Fetch zero or more Puppies
   * const puppies = await prisma.puppy.findMany()
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.puppy`: Exposes CRUD operations for the **Puppy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Puppies
    * const puppies = await prisma.puppy.findMany()
    * ```
    */
  get puppy(): Prisma.PuppyDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
    Puppy: 'Puppy'
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
      modelProps: "puppy"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Puppy: {
        payload: Prisma.$PuppyPayload<ExtArgs>
        fields: Prisma.PuppyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PuppyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PuppyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          findFirst: {
            args: Prisma.PuppyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PuppyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          findMany: {
            args: Prisma.PuppyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>[]
          }
          create: {
            args: Prisma.PuppyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          createMany: {
            args: Prisma.PuppyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PuppyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>[]
          }
          delete: {
            args: Prisma.PuppyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          update: {
            args: Prisma.PuppyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          deleteMany: {
            args: Prisma.PuppyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PuppyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PuppyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>[]
          }
          upsert: {
            args: Prisma.PuppyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuppyPayload>
          }
          aggregate: {
            args: Prisma.PuppyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePuppy>
          }
          groupBy: {
            args: Prisma.PuppyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PuppyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PuppyCountArgs<ExtArgs>
            result: $Utils.Optional<PuppyCountAggregateOutputType> | number
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
    puppy?: PuppyOmit
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
   * Models
   */

  /**
   * Model Puppy
   */

  export type AggregatePuppy = {
    _count: PuppyCountAggregateOutputType | null
    _avg: PuppyAvgAggregateOutputType | null
    _sum: PuppySumAggregateOutputType | null
    _min: PuppyMinAggregateOutputType | null
    _max: PuppyMaxAggregateOutputType | null
  }

  export type PuppyAvgAggregateOutputType = {
    position: number | null
  }

  export type PuppySumAggregateOutputType = {
    position: number | null
  }

  export type PuppyMinAggregateOutputType = {
    id: string | null
    name: string | null
    breed: string | null
    ownerName: string | null
    ownerPhone: string | null
    service: string | null
    notes: string | null
    status: string | null
    arrivalTime: string | null
    serviceStartTime: string | null
    serviceEndTime: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PuppyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    breed: string | null
    ownerName: string | null
    ownerPhone: string | null
    service: string | null
    notes: string | null
    status: string | null
    arrivalTime: string | null
    serviceStartTime: string | null
    serviceEndTime: string | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PuppyCountAggregateOutputType = {
    id: number
    name: number
    breed: number
    ownerName: number
    ownerPhone: number
    service: number
    notes: number
    status: number
    arrivalTime: number
    serviceStartTime: number
    serviceEndTime: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PuppyAvgAggregateInputType = {
    position?: true
  }

  export type PuppySumAggregateInputType = {
    position?: true
  }

  export type PuppyMinAggregateInputType = {
    id?: true
    name?: true
    breed?: true
    ownerName?: true
    ownerPhone?: true
    service?: true
    notes?: true
    status?: true
    arrivalTime?: true
    serviceStartTime?: true
    serviceEndTime?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PuppyMaxAggregateInputType = {
    id?: true
    name?: true
    breed?: true
    ownerName?: true
    ownerPhone?: true
    service?: true
    notes?: true
    status?: true
    arrivalTime?: true
    serviceStartTime?: true
    serviceEndTime?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PuppyCountAggregateInputType = {
    id?: true
    name?: true
    breed?: true
    ownerName?: true
    ownerPhone?: true
    service?: true
    notes?: true
    status?: true
    arrivalTime?: true
    serviceStartTime?: true
    serviceEndTime?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PuppyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Puppy to aggregate.
     */
    where?: PuppyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puppies to fetch.
     */
    orderBy?: PuppyOrderByWithRelationInput | PuppyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PuppyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puppies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puppies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Puppies
    **/
    _count?: true | PuppyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PuppyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PuppySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PuppyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PuppyMaxAggregateInputType
  }

  export type GetPuppyAggregateType<T extends PuppyAggregateArgs> = {
        [P in keyof T & keyof AggregatePuppy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePuppy[P]>
      : GetScalarType<T[P], AggregatePuppy[P]>
  }




  export type PuppyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PuppyWhereInput
    orderBy?: PuppyOrderByWithAggregationInput | PuppyOrderByWithAggregationInput[]
    by: PuppyScalarFieldEnum[] | PuppyScalarFieldEnum
    having?: PuppyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PuppyCountAggregateInputType | true
    _avg?: PuppyAvgAggregateInputType
    _sum?: PuppySumAggregateInputType
    _min?: PuppyMinAggregateInputType
    _max?: PuppyMaxAggregateInputType
  }

  export type PuppyGroupByOutputType = {
    id: string
    name: string
    breed: string
    ownerName: string
    ownerPhone: string
    service: string
    notes: string | null
    status: string
    arrivalTime: string
    serviceStartTime: string | null
    serviceEndTime: string | null
    position: number
    createdAt: Date
    updatedAt: Date
    _count: PuppyCountAggregateOutputType | null
    _avg: PuppyAvgAggregateOutputType | null
    _sum: PuppySumAggregateOutputType | null
    _min: PuppyMinAggregateOutputType | null
    _max: PuppyMaxAggregateOutputType | null
  }

  type GetPuppyGroupByPayload<T extends PuppyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PuppyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PuppyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PuppyGroupByOutputType[P]>
            : GetScalarType<T[P], PuppyGroupByOutputType[P]>
        }
      >
    >


  export type PuppySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    breed?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    service?: boolean
    notes?: boolean
    status?: boolean
    arrivalTime?: boolean
    serviceStartTime?: boolean
    serviceEndTime?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["puppy"]>

  export type PuppySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    breed?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    service?: boolean
    notes?: boolean
    status?: boolean
    arrivalTime?: boolean
    serviceStartTime?: boolean
    serviceEndTime?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["puppy"]>

  export type PuppySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    breed?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    service?: boolean
    notes?: boolean
    status?: boolean
    arrivalTime?: boolean
    serviceStartTime?: boolean
    serviceEndTime?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["puppy"]>

  export type PuppySelectScalar = {
    id?: boolean
    name?: boolean
    breed?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    service?: boolean
    notes?: boolean
    status?: boolean
    arrivalTime?: boolean
    serviceStartTime?: boolean
    serviceEndTime?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PuppyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "breed" | "ownerName" | "ownerPhone" | "service" | "notes" | "status" | "arrivalTime" | "serviceStartTime" | "serviceEndTime" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["puppy"]>

  export type $PuppyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Puppy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      breed: string
      ownerName: string
      ownerPhone: string
      service: string
      notes: string | null
      status: string
      arrivalTime: string
      serviceStartTime: string | null
      serviceEndTime: string | null
      position: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["puppy"]>
    composites: {}
  }

  type PuppyGetPayload<S extends boolean | null | undefined | PuppyDefaultArgs> = $Result.GetResult<Prisma.$PuppyPayload, S>

  type PuppyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PuppyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PuppyCountAggregateInputType | true
    }

  export interface PuppyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Puppy'], meta: { name: 'Puppy' } }
    /**
     * Find zero or one Puppy that matches the filter.
     * @param {PuppyFindUniqueArgs} args - Arguments to find a Puppy
     * @example
     * // Get one Puppy
     * const puppy = await prisma.puppy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PuppyFindUniqueArgs>(args: SelectSubset<T, PuppyFindUniqueArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Puppy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PuppyFindUniqueOrThrowArgs} args - Arguments to find a Puppy
     * @example
     * // Get one Puppy
     * const puppy = await prisma.puppy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PuppyFindUniqueOrThrowArgs>(args: SelectSubset<T, PuppyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Puppy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyFindFirstArgs} args - Arguments to find a Puppy
     * @example
     * // Get one Puppy
     * const puppy = await prisma.puppy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PuppyFindFirstArgs>(args?: SelectSubset<T, PuppyFindFirstArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Puppy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyFindFirstOrThrowArgs} args - Arguments to find a Puppy
     * @example
     * // Get one Puppy
     * const puppy = await prisma.puppy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PuppyFindFirstOrThrowArgs>(args?: SelectSubset<T, PuppyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Puppies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Puppies
     * const puppies = await prisma.puppy.findMany()
     * 
     * // Get first 10 Puppies
     * const puppies = await prisma.puppy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const puppyWithIdOnly = await prisma.puppy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PuppyFindManyArgs>(args?: SelectSubset<T, PuppyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Puppy.
     * @param {PuppyCreateArgs} args - Arguments to create a Puppy.
     * @example
     * // Create one Puppy
     * const Puppy = await prisma.puppy.create({
     *   data: {
     *     // ... data to create a Puppy
     *   }
     * })
     * 
     */
    create<T extends PuppyCreateArgs>(args: SelectSubset<T, PuppyCreateArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Puppies.
     * @param {PuppyCreateManyArgs} args - Arguments to create many Puppies.
     * @example
     * // Create many Puppies
     * const puppy = await prisma.puppy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PuppyCreateManyArgs>(args?: SelectSubset<T, PuppyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Puppies and returns the data saved in the database.
     * @param {PuppyCreateManyAndReturnArgs} args - Arguments to create many Puppies.
     * @example
     * // Create many Puppies
     * const puppy = await prisma.puppy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Puppies and only return the `id`
     * const puppyWithIdOnly = await prisma.puppy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PuppyCreateManyAndReturnArgs>(args?: SelectSubset<T, PuppyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Puppy.
     * @param {PuppyDeleteArgs} args - Arguments to delete one Puppy.
     * @example
     * // Delete one Puppy
     * const Puppy = await prisma.puppy.delete({
     *   where: {
     *     // ... filter to delete one Puppy
     *   }
     * })
     * 
     */
    delete<T extends PuppyDeleteArgs>(args: SelectSubset<T, PuppyDeleteArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Puppy.
     * @param {PuppyUpdateArgs} args - Arguments to update one Puppy.
     * @example
     * // Update one Puppy
     * const puppy = await prisma.puppy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PuppyUpdateArgs>(args: SelectSubset<T, PuppyUpdateArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Puppies.
     * @param {PuppyDeleteManyArgs} args - Arguments to filter Puppies to delete.
     * @example
     * // Delete a few Puppies
     * const { count } = await prisma.puppy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PuppyDeleteManyArgs>(args?: SelectSubset<T, PuppyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Puppies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Puppies
     * const puppy = await prisma.puppy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PuppyUpdateManyArgs>(args: SelectSubset<T, PuppyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Puppies and returns the data updated in the database.
     * @param {PuppyUpdateManyAndReturnArgs} args - Arguments to update many Puppies.
     * @example
     * // Update many Puppies
     * const puppy = await prisma.puppy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Puppies and only return the `id`
     * const puppyWithIdOnly = await prisma.puppy.updateManyAndReturn({
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
    updateManyAndReturn<T extends PuppyUpdateManyAndReturnArgs>(args: SelectSubset<T, PuppyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Puppy.
     * @param {PuppyUpsertArgs} args - Arguments to update or create a Puppy.
     * @example
     * // Update or create a Puppy
     * const puppy = await prisma.puppy.upsert({
     *   create: {
     *     // ... data to create a Puppy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Puppy we want to update
     *   }
     * })
     */
    upsert<T extends PuppyUpsertArgs>(args: SelectSubset<T, PuppyUpsertArgs<ExtArgs>>): Prisma__PuppyClient<$Result.GetResult<Prisma.$PuppyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Puppies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyCountArgs} args - Arguments to filter Puppies to count.
     * @example
     * // Count the number of Puppies
     * const count = await prisma.puppy.count({
     *   where: {
     *     // ... the filter for the Puppies we want to count
     *   }
     * })
    **/
    count<T extends PuppyCountArgs>(
      args?: Subset<T, PuppyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PuppyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Puppy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PuppyAggregateArgs>(args: Subset<T, PuppyAggregateArgs>): Prisma.PrismaPromise<GetPuppyAggregateType<T>>

    /**
     * Group by Puppy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuppyGroupByArgs} args - Group by arguments.
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
      T extends PuppyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PuppyGroupByArgs['orderBy'] }
        : { orderBy?: PuppyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PuppyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPuppyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Puppy model
   */
  readonly fields: PuppyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Puppy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PuppyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Puppy model
   */
  interface PuppyFieldRefs {
    readonly id: FieldRef<"Puppy", 'String'>
    readonly name: FieldRef<"Puppy", 'String'>
    readonly breed: FieldRef<"Puppy", 'String'>
    readonly ownerName: FieldRef<"Puppy", 'String'>
    readonly ownerPhone: FieldRef<"Puppy", 'String'>
    readonly service: FieldRef<"Puppy", 'String'>
    readonly notes: FieldRef<"Puppy", 'String'>
    readonly status: FieldRef<"Puppy", 'String'>
    readonly arrivalTime: FieldRef<"Puppy", 'String'>
    readonly serviceStartTime: FieldRef<"Puppy", 'String'>
    readonly serviceEndTime: FieldRef<"Puppy", 'String'>
    readonly position: FieldRef<"Puppy", 'Int'>
    readonly createdAt: FieldRef<"Puppy", 'DateTime'>
    readonly updatedAt: FieldRef<"Puppy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Puppy findUnique
   */
  export type PuppyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter, which Puppy to fetch.
     */
    where: PuppyWhereUniqueInput
  }

  /**
   * Puppy findUniqueOrThrow
   */
  export type PuppyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter, which Puppy to fetch.
     */
    where: PuppyWhereUniqueInput
  }

  /**
   * Puppy findFirst
   */
  export type PuppyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter, which Puppy to fetch.
     */
    where?: PuppyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puppies to fetch.
     */
    orderBy?: PuppyOrderByWithRelationInput | PuppyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Puppies.
     */
    cursor?: PuppyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puppies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puppies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Puppies.
     */
    distinct?: PuppyScalarFieldEnum | PuppyScalarFieldEnum[]
  }

  /**
   * Puppy findFirstOrThrow
   */
  export type PuppyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter, which Puppy to fetch.
     */
    where?: PuppyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puppies to fetch.
     */
    orderBy?: PuppyOrderByWithRelationInput | PuppyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Puppies.
     */
    cursor?: PuppyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puppies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puppies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Puppies.
     */
    distinct?: PuppyScalarFieldEnum | PuppyScalarFieldEnum[]
  }

  /**
   * Puppy findMany
   */
  export type PuppyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter, which Puppies to fetch.
     */
    where?: PuppyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puppies to fetch.
     */
    orderBy?: PuppyOrderByWithRelationInput | PuppyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Puppies.
     */
    cursor?: PuppyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puppies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puppies.
     */
    skip?: number
    distinct?: PuppyScalarFieldEnum | PuppyScalarFieldEnum[]
  }

  /**
   * Puppy create
   */
  export type PuppyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * The data needed to create a Puppy.
     */
    data: XOR<PuppyCreateInput, PuppyUncheckedCreateInput>
  }

  /**
   * Puppy createMany
   */
  export type PuppyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Puppies.
     */
    data: PuppyCreateManyInput | PuppyCreateManyInput[]
  }

  /**
   * Puppy createManyAndReturn
   */
  export type PuppyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * The data used to create many Puppies.
     */
    data: PuppyCreateManyInput | PuppyCreateManyInput[]
  }

  /**
   * Puppy update
   */
  export type PuppyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * The data needed to update a Puppy.
     */
    data: XOR<PuppyUpdateInput, PuppyUncheckedUpdateInput>
    /**
     * Choose, which Puppy to update.
     */
    where: PuppyWhereUniqueInput
  }

  /**
   * Puppy updateMany
   */
  export type PuppyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Puppies.
     */
    data: XOR<PuppyUpdateManyMutationInput, PuppyUncheckedUpdateManyInput>
    /**
     * Filter which Puppies to update
     */
    where?: PuppyWhereInput
    /**
     * Limit how many Puppies to update.
     */
    limit?: number
  }

  /**
   * Puppy updateManyAndReturn
   */
  export type PuppyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * The data used to update Puppies.
     */
    data: XOR<PuppyUpdateManyMutationInput, PuppyUncheckedUpdateManyInput>
    /**
     * Filter which Puppies to update
     */
    where?: PuppyWhereInput
    /**
     * Limit how many Puppies to update.
     */
    limit?: number
  }

  /**
   * Puppy upsert
   */
  export type PuppyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * The filter to search for the Puppy to update in case it exists.
     */
    where: PuppyWhereUniqueInput
    /**
     * In case the Puppy found by the `where` argument doesn't exist, create a new Puppy with this data.
     */
    create: XOR<PuppyCreateInput, PuppyUncheckedCreateInput>
    /**
     * In case the Puppy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PuppyUpdateInput, PuppyUncheckedUpdateInput>
  }

  /**
   * Puppy delete
   */
  export type PuppyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
    /**
     * Filter which Puppy to delete.
     */
    where: PuppyWhereUniqueInput
  }

  /**
   * Puppy deleteMany
   */
  export type PuppyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Puppies to delete
     */
    where?: PuppyWhereInput
    /**
     * Limit how many Puppies to delete.
     */
    limit?: number
  }

  /**
   * Puppy without action
   */
  export type PuppyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puppy
     */
    select?: PuppySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puppy
     */
    omit?: PuppyOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PuppyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    breed: 'breed',
    ownerName: 'ownerName',
    ownerPhone: 'ownerPhone',
    service: 'service',
    notes: 'notes',
    status: 'status',
    arrivalTime: 'arrivalTime',
    serviceStartTime: 'serviceStartTime',
    serviceEndTime: 'serviceEndTime',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PuppyScalarFieldEnum = (typeof PuppyScalarFieldEnum)[keyof typeof PuppyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PuppyWhereInput = {
    AND?: PuppyWhereInput | PuppyWhereInput[]
    OR?: PuppyWhereInput[]
    NOT?: PuppyWhereInput | PuppyWhereInput[]
    id?: StringFilter<"Puppy"> | string
    name?: StringFilter<"Puppy"> | string
    breed?: StringFilter<"Puppy"> | string
    ownerName?: StringFilter<"Puppy"> | string
    ownerPhone?: StringFilter<"Puppy"> | string
    service?: StringFilter<"Puppy"> | string
    notes?: StringNullableFilter<"Puppy"> | string | null
    status?: StringFilter<"Puppy"> | string
    arrivalTime?: StringFilter<"Puppy"> | string
    serviceStartTime?: StringNullableFilter<"Puppy"> | string | null
    serviceEndTime?: StringNullableFilter<"Puppy"> | string | null
    position?: IntFilter<"Puppy"> | number
    createdAt?: DateTimeFilter<"Puppy"> | Date | string
    updatedAt?: DateTimeFilter<"Puppy"> | Date | string
  }

  export type PuppyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    service?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    arrivalTime?: SortOrder
    serviceStartTime?: SortOrderInput | SortOrder
    serviceEndTime?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PuppyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PuppyWhereInput | PuppyWhereInput[]
    OR?: PuppyWhereInput[]
    NOT?: PuppyWhereInput | PuppyWhereInput[]
    name?: StringFilter<"Puppy"> | string
    breed?: StringFilter<"Puppy"> | string
    ownerName?: StringFilter<"Puppy"> | string
    ownerPhone?: StringFilter<"Puppy"> | string
    service?: StringFilter<"Puppy"> | string
    notes?: StringNullableFilter<"Puppy"> | string | null
    status?: StringFilter<"Puppy"> | string
    arrivalTime?: StringFilter<"Puppy"> | string
    serviceStartTime?: StringNullableFilter<"Puppy"> | string | null
    serviceEndTime?: StringNullableFilter<"Puppy"> | string | null
    position?: IntFilter<"Puppy"> | number
    createdAt?: DateTimeFilter<"Puppy"> | Date | string
    updatedAt?: DateTimeFilter<"Puppy"> | Date | string
  }, "id">

  export type PuppyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    service?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    arrivalTime?: SortOrder
    serviceStartTime?: SortOrderInput | SortOrder
    serviceEndTime?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PuppyCountOrderByAggregateInput
    _avg?: PuppyAvgOrderByAggregateInput
    _max?: PuppyMaxOrderByAggregateInput
    _min?: PuppyMinOrderByAggregateInput
    _sum?: PuppySumOrderByAggregateInput
  }

  export type PuppyScalarWhereWithAggregatesInput = {
    AND?: PuppyScalarWhereWithAggregatesInput | PuppyScalarWhereWithAggregatesInput[]
    OR?: PuppyScalarWhereWithAggregatesInput[]
    NOT?: PuppyScalarWhereWithAggregatesInput | PuppyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Puppy"> | string
    name?: StringWithAggregatesFilter<"Puppy"> | string
    breed?: StringWithAggregatesFilter<"Puppy"> | string
    ownerName?: StringWithAggregatesFilter<"Puppy"> | string
    ownerPhone?: StringWithAggregatesFilter<"Puppy"> | string
    service?: StringWithAggregatesFilter<"Puppy"> | string
    notes?: StringNullableWithAggregatesFilter<"Puppy"> | string | null
    status?: StringWithAggregatesFilter<"Puppy"> | string
    arrivalTime?: StringWithAggregatesFilter<"Puppy"> | string
    serviceStartTime?: StringNullableWithAggregatesFilter<"Puppy"> | string | null
    serviceEndTime?: StringNullableWithAggregatesFilter<"Puppy"> | string | null
    position?: IntWithAggregatesFilter<"Puppy"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Puppy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Puppy"> | Date | string
  }

  export type PuppyCreateInput = {
    id?: string
    name: string
    breed: string
    ownerName: string
    ownerPhone: string
    service: string
    notes?: string | null
    status?: string
    arrivalTime: string
    serviceStartTime?: string | null
    serviceEndTime?: string | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PuppyUncheckedCreateInput = {
    id?: string
    name: string
    breed: string
    ownerName: string
    ownerPhone: string
    service: string
    notes?: string | null
    status?: string
    arrivalTime: string
    serviceStartTime?: string | null
    serviceEndTime?: string | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PuppyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    arrivalTime?: StringFieldUpdateOperationsInput | string
    serviceStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    serviceEndTime?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuppyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    arrivalTime?: StringFieldUpdateOperationsInput | string
    serviceStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    serviceEndTime?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuppyCreateManyInput = {
    id?: string
    name: string
    breed: string
    ownerName: string
    ownerPhone: string
    service: string
    notes?: string | null
    status?: string
    arrivalTime: string
    serviceStartTime?: string | null
    serviceEndTime?: string | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PuppyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    arrivalTime?: StringFieldUpdateOperationsInput | string
    serviceStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    serviceEndTime?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuppyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    arrivalTime?: StringFieldUpdateOperationsInput | string
    serviceStartTime?: NullableStringFieldUpdateOperationsInput | string | null
    serviceEndTime?: NullableStringFieldUpdateOperationsInput | string | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PuppyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    service?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    arrivalTime?: SortOrder
    serviceStartTime?: SortOrder
    serviceEndTime?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PuppyAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type PuppyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    service?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    arrivalTime?: SortOrder
    serviceStartTime?: SortOrder
    serviceEndTime?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PuppyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    service?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    arrivalTime?: SortOrder
    serviceStartTime?: SortOrder
    serviceEndTime?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PuppySumOrderByAggregateInput = {
    position?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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