<?php

use Psr\Log\LoggerInterface;
class MySqlConnect {
	private $result;
	private $sql;
	private $username;
	private $password;
	private $host;
	private $dbname;
	private $link;

	private $log;
	
	public function __construct() {
		// Parametros de conexión
		$this->username = Config::get('DB_USERNAME');
		$this->password = Config::get('DB_PASSWORD');
		$this->host = Config::get('DB_HOST');
		$this->dbname = Config::get('DB_DBNAME');
		//Instancia Log
		$this->log = new Logger();
	}
	/**
	 * Establecer la conexión
	 */
	public function connect() {
		try {
			$this->link = new mysqli ( $this->host, $this->username, $this->password, $this->dbname );
			if ($this->link->connect_errno) {
				handleException($this->link->connect_error);
				throw new \Exception('Error: Falló la conexión '.$this->link->connect_errno.' '.$this->link->connect_error);
			}
		} catch ( Exception $e ) {
			handleException($e);
		}
	}

	private function getParamTypes(array $params) {
		$types = '';
		foreach ($params as $param) {
			if (is_int($param)) {
				$types .= 'i';
			} elseif (is_float($param)) {
				$types .= 'd';
			} else {
				$types .= 's';
			}
		}
		return $types;
	}

	private function refValues(array &$params) {
		$refs = [];
		foreach ($params as $key => &$value) {
			$refs[$key] = &$value;
		}
		return $refs;
	}

	private function prepareStatement($sql, array $params = []) {
		$stmt = $this->link->prepare($sql);
		if ($stmt === false) {
			handleException($this->link->error);
			throw new \Exception('Error: Falló la preparación de la sentencia '.$this->link->errno.' '.$this->link->error);
		}

		if (!empty($params)) {
			$types = $this->getParamTypes($params);
			$bindParams = array_merge([$types], $this->refValues($params));
			if (!call_user_func_array([$stmt, 'bind_param'], $bindParams)) {
				$stmt->close();
				handleException($stmt->error);
				throw new \Exception('Error: Falló la vinculación de parámetros '.$stmt->errno.' '.$stmt->error);
			}
		}

		if (!$stmt->execute()) {
			$stmt->close();
			handleException($stmt->error);
			throw new \Exception('Error: Falló la ejecución de la sentencia '.$stmt->errno.' '.$stmt->error);
		}

		return $stmt;
	}

	public function executeSQL($sql, $params = null, $resultType="obj") {
		$lista = NULL;
		try {
			if (!is_array($params) && $params !== null) {
				$resultType = $params;
				$params = [];
			}

			$this->connect();

			if (!empty($params)) {
				$stmt = $this->prepareStatement($sql, $params);
				$result = $stmt->get_result();

				if ($result) {
					while ($row = $resultType === 'asoc' ? $result->fetch_assoc() : ($resultType === 'num' ? $result->fetch_row() : $result->fetch_object())) {
						$lista[] = $row;
					}
					$result->free();
				}
				$stmt->close();
			} else {
				if ($result = $this->link->query($sql)) {
					while ($row = $resultType === 'asoc' ? $result->fetch_assoc() : ($resultType === 'num' ? $result->fetch_row() : $result->fetch_object())) {
						$lista[] = $row;
					}
					$result->free();
				} else {
					handleException($this->link->error);
					throw new \Exception('Error: Falló la ejecución de la sentencia '.$this->link->errno.' '.$this->link->error);
				}
			}

			$this->link->close();
			return $lista;
		} catch ( Exception $e ) {
			handleException($e);
		}
	}
	/**
	 * Ejecutar una setencia SQL tipo INSERT,UPDATE
	 * @param $sql - string sentencia SQL
	 * @return $num_result - numero de resultados de la ejecución
	 */
	//
	public function executeSQL_DML($sql, $params = null) {
		$num_results = 0;
		try {
			if (!is_array($params) && $params !== null) {
				$params = [];
			}
			$this->connect();

			if (!empty($params)) {
				$stmt = $this->prepareStatement($sql, $params);
				$num_results = $stmt->affected_rows;
				$stmt->close();
			} else {
				if ($this->link->query($sql)) {
					$num_results = mysqli_affected_rows($this->link);
				} else {
					handleException($this->link->error);
					throw new \Exception('Error: Falló la ejecución de la sentencia '.$this->link->errno.' '.$this->link->error);
				}
			}

			$this->link->close();
			return $num_results;
		} catch ( Exception $e ) {
			handleException($e);
		}
	}
	/**
	 * Ejecutar una setencia SQL tipo INSERT,UPDATE
	 * @param $sql - string sentencia SQL
	 * @return $num_result- último id insertado
	 */
	//
	public function executeSQL_DML_last($sql, $params = null) {
		$num_results = 0;
		try {
			if (!is_array($params) && $params !== null) {
				$params = [];
			}
			$this->connect();

			if (!empty($params)) {
				$stmt = $this->prepareStatement($sql, $params);
				$num_results = $this->link->insert_id;
				$stmt->close();
			} else {
				if ($result = $this->link->query($sql)) {
					$num_results = $this->link->insert_id;
				} else {
					handleException($this->link->error);
					throw new \Exception('Error: Falló la ejecución de la sentencia '.$this->link->errno.' '.$this->link->error);
				}
			}

			$this->link->close();
			return $num_results;
		} catch ( Exception $e ) {
			handleException($e);
		}
	}
}
