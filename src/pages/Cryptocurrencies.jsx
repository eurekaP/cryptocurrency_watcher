import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Input,
  Skeleton,
  Breadcrumb,
  Typography,
  Button,
  Empty,
} from "antd";
import { LoadMore } from "../components";

import { SearchOutlined } from "@ant-design/icons";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Skeleton active />;

  return (
    <>
      {!simplified && (
        <>
          <Col>
            <Typography.Title level={1} className="heading">
              Cryptocurrencies
            </Typography.Title>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Cryptocurrencies</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <div className="search-crypto">
            <Input
              type="search"
              placeholder="Search Cryptocurrency"
              size="large"
              prefix={<SearchOutlined />}
              allowClear
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </>
      )}
      <Row gutter={[24, 24]} className="crypto-card-container">
        {cryptos?.length > 2 ? (
          cryptos?.slice(0, visible).map(currency => (
            <Col
              xs={24}
              sm={12}
              xl={6}
              xxl={4}
              className="crypto-card"
              key={currency.id}
            >
              <Link to={`/crypto/${currency.id}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt={currency.name}
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market cap: {millify(currency.marketCap)}</p>
                  <p>Daily change: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col xs={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </Row>
      {!simplified && (
        <LoadMore visible={visible} data={cryptos} setVisible={setVisible} />
      )}
    </>
  );
};

export default Cryptocurrencies;
