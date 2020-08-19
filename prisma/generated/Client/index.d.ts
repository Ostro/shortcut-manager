import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.4.1
 * Query Engine version: 195d4bdc2d16132977f4ba7a8ca312f7906cb086
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

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
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

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


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.shortcut`: Exposes CRUD operations for the **Shortcut** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shortcuts
    * const shortcuts = await prisma.shortcut.findMany()
    * ```
    */
  get shortcut(): ShortcutDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model User
 */

export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
  shadowUuid: string
}



export type UserSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  shadowUuid?: boolean
  shortcuts?: boolean | FindManyShortcutArgs
}

export type UserInclude = {
  shortcuts?: boolean | FindManyShortcutArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'shortcuts'
      ? Array<ShortcutGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'shortcuts'
      ? Array<ShortcutGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
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
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
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
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
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
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  shortcuts<T extends FindManyShortcutArgs = {}>(args?: Subset<T, FindManyShortcutArgs>): CheckSelect<T, Promise<Array<Shortcut>>, Promise<Array<ShortcutGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Shortcut
 */

export type Shortcut = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  path: string
  icon: string | null
  userId: string | null
}



export type ShortcutSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  name?: boolean
  path?: boolean
  icon?: boolean
  User?: boolean | UserArgs
  userId?: boolean
}

export type ShortcutInclude = {
  User?: boolean | UserArgs
}

export type ShortcutGetPayload<
  S extends boolean | null | undefined | ShortcutArgs,
  U = keyof S
> = S extends true
  ? Shortcut
  : S extends undefined
  ? never
  : S extends ShortcutArgs | FindManyShortcutArgs
  ? 'include' extends U
    ? Shortcut  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Shortcut ? Shortcut[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : Shortcut
: Shortcut


export interface ShortcutDelegate {
  /**
   * Find zero or one Shortcut.
   * @param {FindOneShortcutArgs} args - Arguments to find a Shortcut
   * @example
   * // Get one Shortcut
   * const shortcut = await prisma.shortcut.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneShortcutArgs>(
    args: Subset<T, FindOneShortcutArgs>
  ): CheckSelect<T, Prisma__ShortcutClient<Shortcut | null>, Prisma__ShortcutClient<ShortcutGetPayload<T> | null>>
  /**
   * Find zero or more Shortcuts.
   * @param {FindManyShortcutArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Shortcuts
   * const shortcuts = await prisma.shortcut.findMany()
   * 
   * // Get first 10 Shortcuts
   * const shortcuts = await prisma.shortcut.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const shortcutWithIdOnly = await prisma.shortcut.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyShortcutArgs>(
    args?: Subset<T, FindManyShortcutArgs>
  ): CheckSelect<T, Promise<Array<Shortcut>>, Promise<Array<ShortcutGetPayload<T>>>>
  /**
   * Create a Shortcut.
   * @param {ShortcutCreateArgs} args - Arguments to create a Shortcut.
   * @example
   * // Create one Shortcut
   * const Shortcut = await prisma.shortcut.create({
   *   data: {
   *     // ... data to create a Shortcut
   *   }
   * })
   * 
  **/
  create<T extends ShortcutCreateArgs>(
    args: Subset<T, ShortcutCreateArgs>
  ): CheckSelect<T, Prisma__ShortcutClient<Shortcut>, Prisma__ShortcutClient<ShortcutGetPayload<T>>>
  /**
   * Delete a Shortcut.
   * @param {ShortcutDeleteArgs} args - Arguments to delete one Shortcut.
   * @example
   * // Delete one Shortcut
   * const Shortcut = await prisma.shortcut.delete({
   *   where: {
   *     // ... filter to delete one Shortcut
   *   }
   * })
   * 
  **/
  delete<T extends ShortcutDeleteArgs>(
    args: Subset<T, ShortcutDeleteArgs>
  ): CheckSelect<T, Prisma__ShortcutClient<Shortcut>, Prisma__ShortcutClient<ShortcutGetPayload<T>>>
  /**
   * Update one Shortcut.
   * @param {ShortcutUpdateArgs} args - Arguments to update one Shortcut.
   * @example
   * // Update one Shortcut
   * const shortcut = await prisma.shortcut.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ShortcutUpdateArgs>(
    args: Subset<T, ShortcutUpdateArgs>
  ): CheckSelect<T, Prisma__ShortcutClient<Shortcut>, Prisma__ShortcutClient<ShortcutGetPayload<T>>>
  /**
   * Delete zero or more Shortcuts.
   * @param {ShortcutDeleteManyArgs} args - Arguments to filter Shortcuts to delete.
   * @example
   * // Delete a few Shortcuts
   * const { count } = await prisma.shortcut.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ShortcutDeleteManyArgs>(
    args: Subset<T, ShortcutDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Shortcuts.
   * @param {ShortcutUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Shortcuts
   * const shortcut = await prisma.shortcut.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ShortcutUpdateManyArgs>(
    args: Subset<T, ShortcutUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Shortcut.
   * @param {ShortcutUpsertArgs} args - Arguments to update or create a Shortcut.
   * @example
   * // Update or create a Shortcut
   * const shortcut = await prisma.shortcut.upsert({
   *   create: {
   *     // ... data to create a Shortcut
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Shortcut we want to update
   *   }
   * })
  **/
  upsert<T extends ShortcutUpsertArgs>(
    args: Subset<T, ShortcutUpsertArgs>
  ): CheckSelect<T, Prisma__ShortcutClient<Shortcut>, Prisma__ShortcutClient<ShortcutGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyShortcutArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Shortcut.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ShortcutClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Shortcut findOne
 */
export type FindOneShortcutArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * Filter, which Shortcut to fetch.
  **/
  where: ShortcutWhereUniqueInput
}


/**
 * Shortcut findMany
 */
export type FindManyShortcutArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * Filter, which Shortcuts to fetch.
  **/
  where?: ShortcutWhereInput
  /**
   * Determine the order of the Shortcuts to fetch.
  **/
  orderBy?: Enumerable<ShortcutOrderByInput>
  /**
   * Sets the position for listing Shortcuts.
  **/
  cursor?: ShortcutWhereUniqueInput
  /**
   * The number of Shortcuts to fetch. If negative number, it will take Shortcuts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Shortcuts.
  **/
  skip?: number
}


/**
 * Shortcut create
 */
export type ShortcutCreateArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * The data needed to create a Shortcut.
  **/
  data: ShortcutCreateInput
}


/**
 * Shortcut update
 */
export type ShortcutUpdateArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * The data needed to update a Shortcut.
  **/
  data: ShortcutUpdateInput
  /**
   * Choose, which Shortcut to update.
  **/
  where: ShortcutWhereUniqueInput
}


/**
 * Shortcut updateMany
 */
export type ShortcutUpdateManyArgs = {
  data: ShortcutUpdateManyMutationInput
  where?: ShortcutWhereInput
}


/**
 * Shortcut upsert
 */
export type ShortcutUpsertArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * The filter to search for the Shortcut to update in case it exists.
  **/
  where: ShortcutWhereUniqueInput
  /**
   * In case the Shortcut found by the `where` argument doesn't exist, create a new Shortcut with this data.
  **/
  create: ShortcutCreateInput
  /**
   * In case the Shortcut was found with the provided `where` argument, update it with this data.
  **/
  update: ShortcutUpdateInput
}


/**
 * Shortcut delete
 */
export type ShortcutDeleteArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
  /**
   * Filter which Shortcut to delete.
  **/
  where: ShortcutWhereUniqueInput
}


/**
 * Shortcut deleteMany
 */
export type ShortcutDeleteManyArgs = {
  where?: ShortcutWhereInput
}


/**
 * Shortcut without action
 */
export type ShortcutArgs = {
  /**
   * Select specific fields to fetch from the Shortcut
  **/
  select?: ShortcutSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ShortcutInclude | null
}



/**
 * Deep Input Types
 */


export type ShortcutWhereInput = {
  id?: string | UUIDFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
  name?: string | StringFilter
  path?: string | StringFilter
  icon?: string | NullableStringFilter | null
  userId?: string | NullableStringFilter | null
  AND?: Enumerable<ShortcutWhereInput>
  OR?: Array<ShortcutWhereInput>
  NOT?: Enumerable<ShortcutWhereInput>
  User?: UserWhereInput | null
}

export type UserWhereInput = {
  id?: string | UUIDFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
  shadowUuid?: string | StringFilter
  shortcuts?: ShortcutFilter | null
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
}

export type UserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  shadowUuid?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: string
  shadowUuid?: string
}

export type ShortcutOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
  name?: SortOrder
  path?: SortOrder
  icon?: SortOrder
  userId?: SortOrder
}

export type ShortcutWhereUniqueInput = {
  id?: string
}

export type ShortcutCreateWithoutUserInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  path: string
  icon?: string | null
}

export type ShortcutCreateManyWithoutUserInput = {
  create?: Enumerable<ShortcutCreateWithoutUserInput>
  connect?: Enumerable<ShortcutWhereUniqueInput>
}

export type UserCreateInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  shadowUuid: string
  shortcuts?: ShortcutCreateManyWithoutUserInput
}

export type ShortcutUpdateWithoutUserDataInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string
  path?: string
  icon?: string | null
}

export type ShortcutUpdateWithWhereUniqueWithoutUserInput = {
  where: ShortcutWhereUniqueInput
  data: ShortcutUpdateWithoutUserDataInput
}

export type ShortcutScalarWhereInput = {
  id?: string | UUIDFilter
  createdAt?: Date | string | DateTimeFilter
  updatedAt?: Date | string | DateTimeFilter
  name?: string | StringFilter
  path?: string | StringFilter
  icon?: string | NullableStringFilter | null
  userId?: string | NullableStringFilter | null
  AND?: Enumerable<ShortcutScalarWhereInput>
  OR?: Array<ShortcutScalarWhereInput>
  NOT?: Enumerable<ShortcutScalarWhereInput>
}

export type ShortcutUpdateManyDataInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string
  path?: string
  icon?: string | null
}

export type ShortcutUpdateManyWithWhereNestedInput = {
  where: ShortcutScalarWhereInput
  data: ShortcutUpdateManyDataInput
}

export type ShortcutUpsertWithWhereUniqueWithoutUserInput = {
  where: ShortcutWhereUniqueInput
  update: ShortcutUpdateWithoutUserDataInput
  create: ShortcutCreateWithoutUserInput
}

export type ShortcutUpdateManyWithoutUserInput = {
  create?: Enumerable<ShortcutCreateWithoutUserInput>
  connect?: Enumerable<ShortcutWhereUniqueInput>
  set?: Enumerable<ShortcutWhereUniqueInput>
  disconnect?: Enumerable<ShortcutWhereUniqueInput>
  delete?: Enumerable<ShortcutWhereUniqueInput>
  update?: Enumerable<ShortcutUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: Enumerable<ShortcutUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<ShortcutScalarWhereInput>
  upsert?: Enumerable<ShortcutUpsertWithWhereUniqueWithoutUserInput>
}

export type UserUpdateInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  shadowUuid?: string
  shortcuts?: ShortcutUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  shadowUuid?: string
}

export type UserCreateWithoutShortcutsInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  shadowUuid: string
}

export type UserCreateOneWithoutShortcutsInput = {
  create?: UserCreateWithoutShortcutsInput
  connect?: UserWhereUniqueInput
}

export type ShortcutCreateInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name: string
  path: string
  icon?: string | null
  User?: UserCreateOneWithoutShortcutsInput
}

export type UserUpdateWithoutShortcutsDataInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  shadowUuid?: string
}

export type UserUpsertWithoutShortcutsInput = {
  update: UserUpdateWithoutShortcutsDataInput
  create: UserCreateWithoutShortcutsInput
}

export type UserUpdateOneWithoutShortcutsInput = {
  create?: UserCreateWithoutShortcutsInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutShortcutsDataInput
  upsert?: UserUpsertWithoutShortcutsInput
}

export type ShortcutUpdateInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string
  path?: string
  icon?: string | null
  User?: UserUpdateOneWithoutShortcutsInput
}

export type ShortcutUpdateManyMutationInput = {
  id?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  name?: string
  path?: string
  icon?: string | null
}

export type UUIDFilter = {
  equals?: string
  not?: string | UUIDFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type ShortcutFilter = {
  every?: ShortcutWhereInput
  some?: ShortcutWhereInput
  none?: ShortcutWhereInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
