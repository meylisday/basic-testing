import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(12)).toEqual({ _balance: 12 });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(12).withdraw(100)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(12);
    expect(() => getBankAccount(12).transfer(100, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      getBankAccount(12).transfer(100, getBankAccount(12)),
    ).toThrowError();
  });

  test('should deposit money', () => {
    expect(getBankAccount(12).deposit(12)).toEqual({ _balance: 24 });
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(25)).toEqual({ _balance: 75 });
  });

  test('should transfer money', () => {
    const toAccount = getBankAccount(12);
    expect(getBankAccount(100).transfer(25, toAccount)).toEqual({
      _balance: 75,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(10).mockReturnValueOnce(1);
    const result = await getBankAccount(100).fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
