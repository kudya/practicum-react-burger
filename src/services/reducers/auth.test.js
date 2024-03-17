import { authReducer } from './auth';

const initialStateEmpty = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null,
}

const initialStateWithData = {
    user: {
        email: 'mr.test@gmail.com',
        name: 'Mr. Test'
    },
    isAuthChecked: false,
    loading: false,
    error: null,
}

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle setAuthChecked', () => {
        expect(authReducer({
            ...initialStateEmpty,
        }, {
            type: 'auth/setAuthChecked',
            payload: true,
        }))
            .toEqual({
                ...initialStateEmpty,
                isAuthChecked: true,
            })
    })

    it('should handle setUser', () => {
        expect(authReducer({
            ...initialStateEmpty,
        }, {
            type: 'auth/setUser',
            payload: {
                email: 'mr.test@gmail.com',
                name: 'Mr. Test'
            },
        }))
            .toEqual({
                ...initialStateEmpty,
                user: {
                    email: 'mr.test@gmail.com',
                    name: 'Mr. Test'
                },
            })
    })

    it('should handle pending registerUser', () => {
        expect(authReducer({
            ...initialStateEmpty,
            error: 'Ошибка 404',
        }, {
            type: 'auth/registerUser/pending',
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: true,
                error: null,
            })
    })

    it('should handle failed registerUser', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/registerUser/rejected',
            error: {
                message: 'Ошибка 404'
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed registerUser with error message placeholder', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/registerUser/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Произошла ошибка при регистрации',
            })
    })

    it('should handle successful registerUser', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/registerUser/fulfilled',
            payload: {
                email: 'mr.test@gmail.com',
                name: 'Mr. Test',
            },
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                user: {
                    email: 'mr.test@gmail.com',
                    name: 'Mr. Test'
                },
            })
    })

    it('should handle pending login', () => {
        expect(authReducer({
            ...initialStateEmpty,
            error: 'Ошибка 404',
        }, {
            type: 'auth/login/pending',
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: true,
                error: null,
            })
    })

    it('should handle failed login', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/login/rejected',
            error: {
                message: 'Ошибка 404'
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed login with error message placeholder', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/login/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Произошла ошибка при входе в аккаунт',
            })
    })

    it('should handle successful login', () => {
        expect(authReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'auth/login/fulfilled',
            payload: {
                email: 'mr.test@gmail.com',
                name: 'Mr. Test',
            },
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                user: {
                    email: 'mr.test@gmail.com',
                    name: 'Mr. Test'
                },
            })
    })

    it('should handle pending logout', () => {
        expect(authReducer({
            ...initialStateWithData,
            error: 'Ошибка 404',
        }, {
            type: 'auth/logout/pending',
        }))
            .toEqual({
                ...initialStateWithData,
                loading: true,
                error: null,
            })
    })

    it('should handle failed logout', () => {
        expect(authReducer({
            ...initialStateWithData,
            loading: true,
        }, {
            type: 'auth/logout/rejected',
            error: {
                message: 'Ошибка 404'
            }
        }))
            .toEqual({
                ...initialStateWithData,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed logout with error message placeholder', () => {
        expect(authReducer({
            ...initialStateWithData,
            loading: true,
        }, {
            type: 'auth/logout/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateWithData,
                loading: false,
                error: 'Произошла ошибка при выходе из аккаунта',
            })
    })

    it('should handle successful logout', () => {
        expect(authReducer({
            ...initialStateWithData,
            loading: true,
        }, {
            type: 'auth/logout/fulfilled',
        }))
            .toEqual({
                ...initialStateEmpty,
            })
    })
})
