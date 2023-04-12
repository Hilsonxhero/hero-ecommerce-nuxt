import { isString } from './types'

class ThrowError extends Error {
    constructor(m: string) {
        super(m)
        this.name = 'Error'
    }
}

export function throwError(scope: string, m: string): never {
    throw new ThrowError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {

}