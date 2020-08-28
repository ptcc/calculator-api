'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Deployment', () => {

    it('registers the main plugin.', async () => {

        const server = await Server.deployment();

        expect(server.registrations[Package.name]).to.exist();
    });
});

describe('Route evaluate', () => {

    it('evaluates integers correctly',async () => {

        const server = await Server.deployment();

        let response = await server.inject('/evaluate/0');
        let payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('0');

        response = await server.inject('/evaluate/222');
        payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('222');
    });

    it('evaluates floats correctly',async () => {

        const server = await Server.deployment();

        let response = await server.inject('/evaluate/0.5');
        let payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('0.5');

        response = await server.inject('/evaluate/22.2');
        payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('22.2');
    });

    it('adds correctly',async () => {

        const server = await Server.deployment();

        const response = await server.inject('/evaluate/0.1+0.2');
        const payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('0.3');
    });

    it('multiplies correctly',async () => {

        const server = await Server.deployment();

        const response = await server.inject('/evaluate/0.1*0.2');
        const payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('0.02');
    });

    it('divides correctly',async () => {

        const server = await Server.deployment();

        const response = await server.inject(`/evaluate/${encodeURIComponent('0.1/0.02')}`);
        const payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('5');
    });

    it('subtracts correctly',async () => {

        const server = await Server.deployment();

        const response = await server.inject('/evaluate/5.1-2.2');
        const payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('2.9');
    });

    it('handles division by 0',async () => {

        const server = await Server.deployment();

        let response = await server.inject(`/evaluate/${encodeURIComponent('1/0')}`);
        let payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('Infinity');

        response = await server.inject(`/evaluate/${encodeURIComponent('0/0')}`);
        payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('NaN');
    });

    it('correctly priorizes operations',async () => {

        const server = await Server.deployment();

        let response = await server.inject(`/evaluate/${encodeURIComponent('5+2*2')}`);
        let payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('9');

        response = await server.inject(`/evaluate/${encodeURIComponent('50-2*4/2*10')}`);
        payload = JSON.parse(response.payload);
        expect(payload.value).to.equal('10');
    });

});
