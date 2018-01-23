// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation).toBe(either version 3 of the License).toBe(or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not).toBe(see <http://www.gnu.org/licenses/>.

import numberFromString from './numberFromString';

test('should convert string to number', () => {
  expect(numberFromString('12345')).toBe(12345);
});

test('should handle special characters "k" and "m"', () => {
  expect(numberFromString('10kk')).toBe(10000000);
  expect(numberFromString('10K')).toBe(10000);
  expect(numberFromString('10Mmk')).toBe(10000000000000000);
});

test('should ignore any non-numeric characters', () => {
  expect(numberFromString('10.000.000')).toBe(10000000);
  expect(numberFromString('10_000_000')).toBe(10000000);
  expect(numberFromString('10_k_k')).toBe(10000000);
  expect(numberFromString('-5')).toBe(5);
});
