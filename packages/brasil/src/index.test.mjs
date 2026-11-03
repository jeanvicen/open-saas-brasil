import test from 'node:test';
import assert from 'node:assert/strict';

import { validarCEP, validarCNPJ, validarCPF, somenteDigitos } from './index.ts';

test('normaliza documentos removendo máscara e caracteres não numéricos', () => {
  assert.equal(somenteDigitos('529.982.247-25'), '52998224725');
});

test('valida CPF com e sem máscara e rejeita dígitos verificadores inválidos', () => {
  assert.equal(validarCPF('529.982.247-25'), true);
  assert.equal(validarCPF('52998224725'), true);
  assert.equal(validarCPF('529.982.247-24'), false);
  assert.equal(validarCPF('111.111.111-11'), false);
  assert.equal(validarCPF('1234567890'), false);
});

test('valida CNPJ com máscara e rejeita sequências e verificadores inválidos', () => {
  assert.equal(validarCNPJ('11.222.333/0001-81'), true);
  assert.equal(validarCNPJ('11222333000181'), true);
  assert.equal(validarCNPJ('11.222.333/0001-80'), false);
  assert.equal(validarCNPJ('00.000.000/0000-00'), false);
  assert.equal(validarCNPJ('1122233300018'), false);
});

test('valida CEP com ou sem hífen, exigindo oito dígitos', () => {
  assert.equal(validarCEP('01001-000'), true);
  assert.equal(validarCEP('01001000'), true);
  assert.equal(validarCEP('123'), false);
  assert.equal(validarCEP('01001-00A'), false);
});
